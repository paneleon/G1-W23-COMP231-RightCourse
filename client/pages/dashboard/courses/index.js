import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import axiosInstance from "../../../configs/axios";
import { useAuth } from "../../../contexts/AuthContextProvider";

const CourseDashBoardIndexPage = () => {
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

  const fetchCourses = async () => {
    try {
      const { data } = await axiosInstance.get("/course/getAll/");
      console.log(data);
      setcourses(data || []);
    } catch (error) {
      console.log(error);
    }
  };
  const onAddCourseFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const courseName = e.target.courseName.value;
      const courseCode = e.target.courseCode.value;
      const description = e.target.description.value;
      const schoolId = e.target.schoolId.value;

      if (!courseName || !courseCode || !description || !schoolId) {
        alert("Please fill all fields");
        return;
      }
      const formData = {
        courseName,
        courseCode,
        description,
        schoolId,
      };
      console.log(formData);
      const { data } = await axiosInstance.post("/course/add", {
        courseName,
        courseCode,
        description,
        schoolId,
      });

      // reset fetch courses
      await fetchCourses();

      // Reset form
      formRef.current.reset();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onEditCourseFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const courseName = e.target.courseName.value;
      const courseCode = e.target.courseCode.value;
      const description = e.target.description.value;
      const schoolId = e.target.schoolId.value;

      if (!courseName || !courseCode || !description || !schoolId) {
        alert("Please fill all fields");
        return;
      }

      const updatedCourseData = {
        courseName,
        courseCode,
        description,
        schoolId,
      };

      console.log(updatedCourseData);
      await axiosInstance.put(
        `/course/update/${editedCourse._id}`,
        updatedCourseData
      );
      // refetch
      await fetchCourses();

      // set edited course to null
      setEditedCourse(null);
    } catch (error) {
      console.log(error);
    }
  };
  const onCancelEditCourse = async () => {
    setEditedCourse(null);
  };

  // delete course
  const deleteCourse = async (courseId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this course?"
      );
      if (confirmed) {
        await axiosInstance.delete(`/course/delete/${courseId}`);
        // refetch
        await fetchCourses();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // fetch data
  React.useEffect(() => {
    fetchCourses();
    fetchSchools();
  }, []);

  return (
    <div className="mt-6 max-w-4xl mx-auto">
      <Head>
        <title>All Courses Dashboard | RightCourse</title>
      </Head>
      <div className="flex space-x-1 text-gray-500 mb-5">
        <Link href={`/`}>
          <a className="underline">Home</a>
        </Link>
        <span>-</span>
        <span>All Courses Dashboard</span>
      </div>
      <div>
        <h1 className="text-3xl font-semibold mb-4">All Courses Dashboard</h1>
        <p className="text-slate-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut fugit
          dignissimos obcaecati modi, quae ratione ipsam pariatur esse minus
          nulla hic eligendi soluta odit quasi maiores aliquam saepe voluptate
          nostrum.
        </p>

        <div id="form">
          {user && user.role === "admin" && !editedCourse && (
            <div className="mt-6 p-6 bg-white">
              <form onSubmit={onAddCourseFormSubmit} ref={formRef}>
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="courseName" className="font-medium text-sm">
                      Course Name
                    </label>
                    <input
                      required
                      type="text"
                      name="courseName"
                      placeholder="Course Name"
                      className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="courseCode" className="font-medium text-sm">
                      Course Code
                    </label>
                    <input
                      required
                      type="text"
                      name="courseCode"
                      placeholder="Course Code"
                      className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="description"
                      className="font-medium text-sm"
                    >
                      Course Description
                    </label>
                    <input
                      required
                      type="text"
                      name="description"
                      placeholder="Course Description"
                      className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="description"
                      className="font-medium text-sm"
                    >
                      School
                    </label>
                    <select
                      name="schoolId"
                      defaultValue={"_"}
                      className="p-3 border outline-none"
                    >
                      <option value="_" className="hidden">
                        Select School
                      </option>
                      {schools.map((school) => (
                        <option key={school._id} value={school._id}>
                          {school.schoolName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button className="bg-indigo-600 text-white p-3 rounded block w-48 text-center hover:bg-indigo-500 transition-all">
                    Add new course
                  </button>
                </div>
              </form>
            </div>
          )}

          {user &&
            editedCourse &&
            (user.role === "admin" || user.role === "editor") && (
              <div className="mt-6 p-6 bg-white">
                <form onSubmit={onEditCourseFormSubmit} ref={formRef}>
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="courseName"
                        className="font-medium text-sm"
                      >
                        Course Name
                      </label>
                      <input
                        required
                        type="text"
                        name="courseName"
                        placeholder="Course Name"
                        onChange={(e) => {
                          setEditedCourse({
                            ...editedCourse,
                            courseName: e.target.value,
                          });
                        }}
                        value={editedCourse?.courseName}
                        className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="courseCode"
                        className="font-medium text-sm"
                      >
                        Course Code
                      </label>
                      <input
                        required
                        type="text"
                        name="courseCode"
                        placeholder="Course Code"
                        onChange={(e) => {
                          setEditedCourse({
                            ...editedCourse,
                            courseCode: e.target.value,
                          });
                        }}
                        value={editedCourse?.courseCode}
                        className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="description"
                        className="font-medium text-sm"
                      >
                        Course Description
                      </label>
                      <input
                        required
                        type="text"
                        name="description"
                        placeholder="Course Description"
                        onChange={(e) => {
                          setEditedCourse({
                            ...editedCourse,
                            description: e.target.value,
                          });
                        }}
                        value={editedCourse?.description}
                        className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="description"
                        className="font-medium text-sm"
                      >
                        School
                      </label>
                      <select
                        name="schoolId"
                        onChange={(e) => {
                          setEditedCourse({
                            ...editedCourse,
                            schoolId: e.target.value,
                          });
                        }}
                        value={editedCourse?.schoolId._id}
                        className="p-3 border outline-none"
                      >
                        {schools.map((school) => (
                          <option key={school._id} value={school._id}>
                            {school.schoolName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 gap-4">
                    <button
                      type="reset"
                      className="bg-indigo-100 p-3 rounded block w-36 text-center hover:bg-indigo-500 transition-all"
                      onClick={onCancelEditCourse}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-yellow-300  p-3 rounded block w-36 text-center hover:bg-indigo-500 transition-all"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-medium mb-4">
            All Courses ({courses.length})
          </h2>
          <div className="grid grid-cols-2  gap-4">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white p-6 rounded shadow-md leading-8 hover:scale-105 transition-all"
              >
                <h3>
                  <strong>Course name:</strong> {course.courseName}
                </h3>
                <p>
                  <strong>Course code:</strong> {course.courseCode}
                </p>
                <p>
                  <strong>SchoolID:</strong> {course.schoolId.schoolName}
                </p>
                <p>
                  <strong>Number of reviews:</strong> {course.totalReviews}
                </p>
                <p>
                  <strong>Average rating:</strong> {course.averageRating}
                </p>
                <div className="flex justify-end">
                  <Link href={`/courses/${course._id}`}>
                    <a className="underline">View Details</a>
                  </Link>
                </div>
                {user && user.role === "admin" && (
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      className="p-2 rounded bg-indigo-800 text-white block w-20 text-sm"
                      onClick={() => {
                        setEditedCourse(course);
                        router.push("#form");
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="p-2 rounded bg-rose-800 text-white block w-20 text-sm"
                      onClick={() => deleteCourse(course._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}

                {user && user.role === "editor" && (
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      className="p-2 rounded bg-indigo-800 text-white block w-20 text-sm"
                      onClick={() => setEditedCourse(course)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDashBoardIndexPage;
