import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import axiosInstance from "../../../configs/axios";
import { useAuth } from "../../../contexts/AuthContextProvider";

const CourseDetailsPage = () => {
  const [course, setCourse] = React.useState(null);

  const [reviews, setReviews] = React.useState([]);

  const [editedReview, setEditedReview] = React.useState(null);
  const router = useRouter();
  const { courseId } = router.query;
  const {
    authState: { user },
  } = useAuth();

  const formRef = React.useRef(null);

  console.log(user);
  // fetch course and its reviews
  const fetchCourse = async () => {
    try {
      const { data } = await axiosInstance.get(`/course/${courseId}`);
      console.log(data);
      setCourse(data.course);
      setReviews(data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  // add new review
  const onAddReviewFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const { professorName, mainTopics, comment, effectiveness } = e.target;
      // do validation
      if (
        professorName.value === "" ||
        mainTopics.value === "" ||
        comment.value === "" ||
        effectiveness.value === ""
      ) {
        return alert("Please fill all the fields");
      }
      const newReview = {
        courseId: courseId,
        professorName: professorName.value,
        mainTopics: mainTopics.value,
        comment: comment.value,
        effectiveness: effectiveness.value,
      };
      await axiosInstance.post("/review/add", newReview);
      // refetch
      await fetchCourse();

      // clear form
      formRef.current.reset();
      console.log(newReview);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axiosInstance.delete(`/review/delete/${reviewId}`);
      // refetch
      await fetchCourse();
    } catch (error) {
      console.log(error);
    }
  };

  const onEditReviewFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const { professorName, mainTopics, comment, effectiveness } = e.target;
      // do validation
      if (
        professorName.value === "" ||
        mainTopics.value === "" ||
        comment.value === "" ||
        effectiveness.value === ""
      ) {
        return alert("Please fill all the fields");
      }
      const updatedReview = {
        professorName: professorName.value,
        mainTopics: mainTopics.value,
        comment: comment.value,
        effectiveness: effectiveness.value,
      };
      await axiosInstance.put(
        `/review/update/${editedReview._id}`,
        updatedReview
      );
      // refetch
      await fetchCourse();

      // set edited review to null
      setEditedReview(null);

      console.log(updatedReview);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-6 max-w-7xl mx-auto">
      <Head>
        <title>{course?.courseName} | RightCourse</title>
      </Head>
      <div className="flex space-x-1 text-gray-500 mb-5">
        <Link href={`/`}>
          <a className="underline">Home</a>
        </Link>
        <span>-</span>
        <span>{course?.courseName}</span>
      </div>
      <div>
        <h1 className="text-3xl font-semibold">{course?.courseName}</h1>
        <p className="text-slate-700 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In, libero!
        </p>
        <div className="mt-4 leading-8">
          <p>
            <strong>Course code:</strong> {course?.courseCode}
          </p>
          <p>
            <strong>School:</strong> {course?.schoolId.schoolName}
          </p>
          <p>
            <strong>Number of reviews:</strong> {course?.totalReviews}
          </p>
          <p>
            <strong>Average rating:</strong>
            {course?.averageRating}
          </p>
          <br />
          <div>
            <Link
              href={`/courses/${courseId}/posts?courseName=${course?.courseName}`}
            >
              <a className="bg-yellow-300 p-3 rounded-md">
                &rarr; View Discussions Board
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-medium mb-4">
          Reviews ({reviews?.length})
        </h2>
        <div className="grid grid-cols-2 gap-8 items-start">
          <div className="grid grid-cols-2  gap-4">
            {reviews?.length > 0 &&
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white p-6 rounded shadow-md leading-8 hover:scale-105 transition-all"
                >
                  <p>
                    <strong>Effectiveness:</strong> {review.effectiveness}{" "}
                    &#9733;
                  </p>
                  <p>
                    <strong>Comment:</strong>
                    {review.comment}
                  </p>
                  <p>
                    <strong>Main topics:</strong>
                    {review.mainTopics}
                  </p>
                  <p>
                    <strong>Professor Name:</strong>
                    {review.professorName}
                  </p>
                  <h3>
                    <strong>by:</strong> {review.userId.username}
                  </h3>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(review.createdAt).toLocaleString("Default", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  {user && user._id === review.userId._id && (
                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        className="p-2 rounded bg-indigo-800 text-white block w-20 text-sm"
                        onClick={() => setEditedReview(review)}
                      >
                        Edit
                      </button>
                      <button
                        className="p-2 rounded bg-rose-800 text-white block w-20 text-sm"
                        onClick={() => deleteReview(review._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {user && !editedReview && (
            <form
              ref={formRef}
              onSubmit={onAddReviewFormSubmit}
              className="p-6 bg-white rounded shadow-md leading-8"
            >
              <div className="mb-4 font-bold">Add your review here!</div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="userName" className="font-medium text-sm">
                    Main Topics
                  </label>
                  <textarea
                    type="text"
                    name="mainTopics"
                    placeholder="Add main topics..."
                    className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                  ></textarea>
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="userName" className="font-medium text-sm">
                    Professor Name
                  </label>
                  <input
                    type="text"
                    name="professorName"
                    placeholder="Add professor name here..."
                    className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="comment" className="font-medium text-sm">
                    Comment
                  </label>
                  <textarea
                    type="text"
                    name="comment"
                    placeholder="Add your comment here..."
                    className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                  ></textarea>
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="effectiveness"
                    className="font-medium text-sm"
                  >
                    Rating Number
                  </label>
                  <select
                    className="p-3 border outline-none"
                    name="effectiveness"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button className="bg-indigo-600 text-white p-3 rounded block w-36 text-center hover:bg-indigo-500 transition-all">
                  Add
                </button>
              </div>
            </form>
          )}

          {user && editedReview && (
            <form
              onSubmit={onEditReviewFormSubmit}
              className="p-6 bg-white rounded shadow-md leading-8"
            >
              <div className="mb-4 font-bold">Update your review here!</div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="userName" className="font-medium text-sm">
                    Main Topics
                  </label>
                  <textarea
                    type="text"
                    name="mainTopics"
                    defaultValue={editedReview.mainTopics}
                    placeholder="Add main topics..."
                    className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                  ></textarea>
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="userName" className="font-medium text-sm">
                    Professor Name
                  </label>
                  <input
                    type="text"
                    name="professorName"
                    defaultValue={editedReview.professorName}
                    placeholder="Add professor name here..."
                    className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="comment" className="font-medium text-sm">
                    Comment
                  </label>
                  <textarea
                    type="text"
                    name="comment"
                    defaultValue={editedReview.comment}
                    placeholder="Add your comment here..."
                    className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                  ></textarea>
                </div>
                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="effectiveness"
                    className="font-medium text-sm"
                  >
                    Rating Number
                  </label>
                  <select
                    className="p-3 border outline-none"
                    name="effectiveness"
                    defaultValue={editedReview.effectiveness}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button className="bg-yellow-300  p-3 rounded block w-36 text-center hover:bg-indigo-500 transition-all">
                  Update
                </button>
              </div>
            </form>
          )}
          {!user && (
            <div>
              <div className="mb-4">
                Ooops!!! To leave a review for this course, you need to login
                first.
              </div>
              <Link href={`/login?redirectLink=${router.asPath}`} passHref>
                <a className="bg-indigo-600 text-white p-4 rounded block w-48 text-center hover:bg-indigo-500 transition-all">
                  Please login
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
