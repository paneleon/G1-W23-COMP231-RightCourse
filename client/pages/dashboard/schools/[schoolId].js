import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import axiosInstance from "../../../configs/axios";
import { useAuth } from "../../../contexts/AuthContextProvider";

const SchoolDetail = () => {
  const [school, setSchool] = React.useState([]);

  const router = useRouter();
  const { schoolId } = router.query;

  const {
    authState: { user },
  } = useAuth();

  const formRef = React.useRef(null);
  const formRef1 = React.useRef(null);

  console.log(user);
  // fetch course and its reviews
  const fetchSchoolDetail = async () => {
    try {
      const { data } = await axiosInstance.get(`/school/${schoolId}`);
      setSchool(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {

    if(schoolId){
        fetchSchoolDetail();
    }
  }, [schoolId]);

  // add new review
  const onEditSchoolFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const { schoolName, schoolType, location, description } = e.target;
      // do validation
      if (
        schoolName.value === "" ||
        schoolType.value === "" ||
        location.value === "" ||
        description.value === ""
      ) {
        return alert("Please fill all the fields");
      }
      const newSchool = {
        schoolName: schoolName.value,
        schoolType: schoolType.value,
        location: location.value,
        description: description.value,
      };
      //   await axiosInstance.post("/school/add", newSchool);
      const response = await axiosInstance.post("/school/add", newSchool);
      const newSchoolId = response.data.school._id
      console.log("new",newSchoolId)

      router.push(`/schools/${newSchoolId}`);
      // refetch
      await fetchSchools();

      // clear form
      formRef.current.reset();
      console.log(newReview);
    } catch (error) {
      console.log(error);
    }
  };

 // delete school
 const deleteSchool = async (schoolId) => {
  try {
    const confirmed = window.confirm(
      "Are you sure you want to delete this school?"
    );
    if (confirmed) {
      await axiosInstance.delete(`/school/delete/${schoolId}`);
      // redirect
      router.push('/dashboard/schools');
    }
  } catch (error) {
    console.log(error);
  }
};




  return (
    <div className="mt-6 max-w-7xl mx-auto">
      <Head>
        <title>{school?.schoolName} | RightCourse</title>
      </Head>
      <div className="flex space-x-1 text-gray-500 mb-5">
        <Link href={`/`}>
          <a className="underline">Home</a>
        </Link>
        <span>-</span>
        <span className="underline cursor-pointer" onClick={() => router.back()}>All Schools Dashboard</span>
        <span>-{school?.schoolName}</span>
      </div>

      <div className="mt-6">
        
        <div className="grid grid-cols-1 gap-8 items-start">


          {user  && (
            <form
            ref={formRef}
            onSubmit={onEditSchoolFormSubmit}
            className="p-6 bg-white rounded shadow-md leading-8"
          >
            <div className="mb-4 font-bold">Details for {school?.schoolName}!</div>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-1">
                <label htmlFor="userName" className="font-medium text-sm">
                  School Name
                </label>
                <input
                  type="text"
                  name="schoolName"
                  defaultValue={school.schoolName}
                  placeholder="Add school name..."
                  className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="userName" className="font-medium text-sm">
                  School Type
                </label>
                <input
                  type="text"
                  name="schoolType"
                  defaultValue={school.schoolType}
                  placeholder="Add school type here..."
                  className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="userName" className="font-medium text-sm">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={school.location}
                  placeholder="Add school location here..."
                  className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="comment" className="font-medium text-sm">
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  defaultValue={school.description}
                  placeholder="Add your description here..."
                  className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end mt-6">
            {user && user.role === "admin" && (
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      className="p-2 rounded bg-rose-800 text-white block w-20 text-sm"
                      onClick={() => deleteSchool(school._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
            </div>
          </form>
          )}
        </div>
        
      </div>

    </div>
  );
};

export default SchoolDetail;
