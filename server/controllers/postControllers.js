const asyncHandler = require("express-async-handler");

const Post = require("../models/post");
const Reply = require("../models/reply");

//@ desc    Get all posts
//@ route   Get /api/post/getAll
//@ access  PUBLIC
const getAllPosts = asyncHandler(async (_, res) => {
  try {
    const posts = await Post.find({});

    res.status(201).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Unable to fetch posts", error: err.message });
  }
});

//@ desc    Get one post
//@ route   Get /api/post/:id
//@ access  PUBLIC
const getOnePost = asyncHandler(async (req, res) => {
  try {
    // get one post and its related replies
    const post = await Post.findById(req.params.id).populate("userId");
    const replies = await Reply.find({ postId: req.params.id }).populate(
      "userId"
    );
    res.status(201).json({
      message: "Posts fetched successfully",
      post,
      replies,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Unable to fetch posts", error: err.message });
  }
});

//@ desc    Add new post
//@ route   POST /api/post/add
//@ access  PRIVATE
const addNewPost = asyncHandler(async (req, res) => {
  try {
    const { title, content } = req.body;
    // add new post
    const newPost = new Post({
      userId: req.user._id,
      title,
      content,
    });

    // Save new post to database
    const savedPost = await newPost.save();

    res.status(201).json({
      message: "Posts fetched successfully",
      savedPost,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Unable to fetch posts", error: err.message });
  }
});

module.exports = {
  getAllPosts,
  addNewPost,
  getOnePost,
};
