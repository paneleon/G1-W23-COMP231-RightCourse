import Head from "next/head";
import Link from "next/link";
import React from "react";
import axiosInstance from "../../configs/axios";

const DiscussionsPage = () => {
  const [posts, setPosts] = React.useState([]);

  console.log(posts);
  const formRef = React.useRef(null);
  const fetchPosts = async () => {
    try {
      const { data } = await axiosInstance.get("/post/getAll");
      setPosts(data.posts || []);
    } catch (error) {
      console.log(error);
    }
  };
  const onAddPostFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const title = e.target.title.value;
      const content = e.target.content.value;
      console.log(title, content);
      const { data } = await axiosInstance.post("/post/add", {
        title,
        content,
      });

      // reset fetch posts
      await fetchPosts();

      // Reset form
      formRef.current.reset();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="mt-6 max-w-4xl mx-auto">
      <Head>
        <title>Discussion Board | RightCourse</title>
      </Head>
      <div>
        <h1 className="text-3xl font-semibold mb-4">Discussion Board</h1>
        <p className="text-slate-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut fugit
          dignissimos obcaecati modi, quae ratione ipsam pariatur esse minus
          nulla hic eligendi soluta odit quasi maiores aliquam saepe voluptate
          nostrum.
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-medium mb-4">All Posts (4)</h2>
          <div className="grid grid-cols-2  gap-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-6 rounded shadow-md leading-8 hover:scale-105 transition-all"
              >
                <h3>
                  <strong>Title:</strong> {post.title}
                </h3>
                <p>
                  <strong>Content:</strong> {post.content}
                </p>

                <p>
                  <strong>Number of replies:</strong> {post.totalReplies}
                </p>
                <p>
                  <strong>Puslished at:</strong>{" "}
                  {new Date(post.createdAt).toLocaleString("Default", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="flex justify-end">
                  <Link href={`/posts/${post._id}`}>
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

export default DiscussionsPage;
