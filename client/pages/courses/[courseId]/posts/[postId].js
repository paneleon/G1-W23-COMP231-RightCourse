import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import axiosInstance from "../../../../configs/axios";
import { useAuth } from "../../../../contexts/AuthContextProvider";

const PostDetailPage = () => {
  const [post, setpost] = React.useState(null);
  const [words, setWords] = React.useState();

  const [replies, setReplies] = React.useState([]);

  const router = useRouter();
  const { postId, courseName } = router.query;
  const {
    authState: { user },
  } = useAuth();

  const formRef = React.useRef(null);

  // fetch post and its replies
  const fetchPost = async () => {
    try {
      const { data } = await axiosInstance.get(`/post/getOne/${postId}`);
      console.log(data);
      setpost(data.post);
      setReplies(data.replies);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  // add new review
  const addReplyFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const { content } = e.target;
      // do validation
      if (content.value === "") {
        return alert("Please fill content field");
      }
      const newReply = {
        content: content.value,
        postId,
      };
      await axiosInstance.post("/reply/add", newReply);
      // refetch
      await fetchPost();

      // clear form
      formRef.current.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-6 max-w-7xl mx-auto">
      <Head>
        <title>{post?.title} | RightCourse</title>
      </Head>
      <div className="flex space-x-1 text-gray-500 mb-5">
        <Link href={`/`}>
          <a className="underline">Home</a>
        </Link>
        <span>-</span>
        <span>Post: {post?.title}</span>
      </div>
      <div>
        <p className="text-gray-500">Related course: {courseName}</p>
        <h1 className="text-3xl font-semibold">{post?.title}</h1>
        <p className="text-slate-700 mt-2">{post?.content}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-medium mb-4">Replies ({replies.length})</h2>
        <div className="grid grid-cols-2 gap-8 items-start">
          <div className="grid grid-cols-2  gap-4">
            {replies.length > 0 &&
              replies.map((reply) => (
                <div
                  key={reply._id}
                  className="bg-white p-6 rounded shadow-md leading-8 hover:scale-105 transition-all"
                >
                  <p>
                    <strong>Content:</strong> {reply.content}
                  </p>
                  <h3>
                    <strong>by:</strong> {reply.userId.username}
                  </h3>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(reply.createdAt).toLocaleString("Default", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  {/* <div className="flex justify-end gap-2 mt-3">
                <button className="p-2 rounded bg-indigo-800 text-white block w-20 text-sm">
                  Edit
                </button>
                <button className="p-2 rounded bg-rose-800 text-white block w-20 text-sm">
                  Delete
                </button>
              </div> */}
                </div>
              ))}
          </div>

          {user && (
            <form
              ref={formRef}
              className="p-6 bg-white rounded shadow-md leading-8"
              onSubmit={addReplyFormSubmit}
            >
              <div className="mb-4 font-bold">Add your reply here!</div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="content" className="font-medium text-sm">
                    Content
                  </label>
                  <textarea
                    type="text"
                    name="content"
                    maxLength={1000}
                    placeholder="Add your content here..."
                    className="border outline-none focus:ring-indigo-400 focus:ring-1 block w-full p-3 rounded"
                    onChange={() => setWords(event.target.value.length)}
                  ></textarea>
                </div>
                {words ? (
                  <p className="font-medium text-sm">characters: {words}</p>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button className="bg-indigo-600 text-white p-3 rounded block w-36 text-center hover:bg-indigo-500 transition-all">
                  Add
                </button>
              </div>
            </form>
          )}

          {!user && (
            <div>
              <div className="mb-4">
                Ooops!!! To leave a reply for this course, you need to login
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

export default PostDetailPage;
