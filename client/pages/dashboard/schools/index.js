import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import axiosInstance from "../../../configs/axios";
import { useAuth } from "../../../contexts/AuthContextProvider";

const SchoolDashBoardIndexPage = () => {
  const [courses, setcourses] = React.useState([]);
  const [schools, setSchools] = React.useState([]);

  const [editedCourse, setEditedCourse] = React.useState(null);
  const router = useRouter();

  const {
    authState: { user },
  } = useAuth();

  const formRef = React.useRef(null);

  const fetchSchools = async () => {
    try {
      const { data } = await axiosInstance.get("/school/getAll/");
      console.log(data);
      setSchools(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddSchoolFormSubmit = async (e) => {
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
      const newSchoolId = response.data.school._id;
      console.log("new", newSchoolId);

      router.push(`/dashboard/schools/${newSchoolId}`);
      // refetch
      await fetchSchools();

      // clear form
      formRef.current.reset();
      console.log(newReview);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <div className="mt-6 max-w-4xl mx-auto">
      <Head>
        <title>All Schools Dashboard | RightCourse</title>
      </Head>
      <div className="flex space-x-1 text-gray-500 mb-5">
        <Link href={`/`}>
          <a className="underline">Home</a>
        </Link>
        <span>-</span>
        <span>All Schools Dashboard</span>
      </div>
      <div>
        <h1 className="text-3xl font-semibold mb-4">All Schools Dashboard</h1>
        <p className="text-slate-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut fugit
          dignissimos obcaecati modi, quae ratione ipsam pariatur esse minus
          nulla hic eligendi soluta odit quasi maiores aliquam saepe voluptate
          nostrum.
        </p>

        <div id="form">
          {user && user.role === "admin" && !editedCourse && (
            <div className="mt-6 p-6 bg-white">
              <form onSubmit={onAddSchoolFormSubmit} ref={formRef}>
                <div className="mb-4 font-bold">Add new school here!</div>
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="userName" className="font-medium text-sm">
                      School Name
                    </label>
                    <input
                      type="text"
                      name="schoolName"
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
                      placeholder="Add your description here..."
                      className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button className="bg-indigo-600 text-white p-3 rounded block w-48 text-center hover:bg-indigo-500 transition-all">
                    Add new school
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {user && user.role == "admin" && (
          <div className="mt-6">
            <h2 className="text-xl font-medium mb-4">
              All Schools ({schools.length})
            </h2>
            <div className="grid grid-cols-2  gap-4">
              {schools.map((school) => (
                <div
                  key={school._id}
                  className="bg-white p-6 rounded shadow-md leading-8 hover:scale-105 transition-all"
                >
                  <h3>
                    <strong>School name:</strong> {school.schoolName}
                  </h3>
                  <p>
                    <strong>School type:</strong> {school.schoolType}
                  </p>
                  <p>
                    <strong>Location:</strong> {school.location}
                  </p>

                  <div className="flex justify-end">
                    <Link href={`/dashboard/schools/${school._id}`}>
                      <a className="underline">View Details</a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolDashBoardIndexPage;