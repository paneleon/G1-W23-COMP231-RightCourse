import Link from "next/link";
import React from "react";
import axiosInstance from "../configs/axios";
import Head from "next/head";
const HomePage = () => {
  const [courses, setCourses] = React.useState([]);
  // Send request to api
  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const searchType = e.target.searchType.value;
      const searchTerm = e.target.searchTerm.value.trim();

      if (searchType === "_") {
        alert("Please select a search type");
        return;
      }

      if (searchTerm.trim() === "") {
        alert("Please enter a search term");
        return;
      }

      let url;
      if (searchType === "COURSE_NAME") {
        url = `/search/course?courseName=${searchTerm}`;
      }
      if (searchType === "COURSE_CODE") {
        url = `/search/course?courseCode=${searchTerm}`;
      }
      if (searchType === "SCHOOL_NAME") {
        url = `/search/course?schoolName=${searchTerm}`;
      }

      const { data } = await axiosInstance.get(url);
      setCourses(data);
      console.log(data);
      console.log(searchType);
      console.log(searchTerm);

      console.log("form submitted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-6 max-w-4xl mx-auto">
      <Head>
        <title>Home | RightCourse</title>
      </Head>
      <div>
        <h1 className="text-3xl font-semibold mb-4">
          Best course review platform. Start searching now!!!
        </h1>
        <p className="text-slate-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut fugit
          dignissimos obcaecati modi, quae ratione ipsam pariatur esse minus
          nulla hic eligendi soluta odit quasi maiores aliquam saepe voluptate
          nostrum.
        </p>
        <div className="mt-6">
          <form onSubmit={onFormSubmit}>
            <div className="flex space-x-2">
              <div className="flex flex-col space-y-1">
                <select
                  className="p-5 border outline-none"
                  defaultValue={"_"}
                  name="searchType"
                >
                  <option value="_" className="hidden">
                    Search type
                  </option>
                  <option value="COURSE_NAME">Course Name</option>
                  <option value="COURSE_CODE">Course Code</option>
                  <option value="SCHOOL_NAME">School Name</option>
                </select>
              </div>
              <div className="grow">
                <input
                  type="text"
                  name="searchTerm"
                  id="searchTerm"
                  className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-5 rounded"
                  placeholder="Search for courses by course code, course name, or school id"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button className="bg-indigo-600 text-white p-4 rounded block w-48 text-center hover:bg-indigo-500 transition-all">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-medium mb-4">
            Search Results ({courses.length})
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
