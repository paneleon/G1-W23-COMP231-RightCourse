const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const Reply = require("../models/reply");

//@ desc    Add a reply
//@ route   POST /api/reply/add
//@ access  PRIVATE
const addReply = asyncHandler(async (req, res) => {
  try {
    const { postId, content } = req.body;

    // add new reply
    const savedReply = await Reply.create({
      userId: req.user._id,
      postId,
      content,
    });

    // increase totalReplies by 1 for a post
    const post = await Post.findById(postId);
    post.totalReplies += 1;
    await post.save();

    res
      .status(201)
      .json({ message: "Reply added successfully", reply: savedReply });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Unable to add reply", error: err.message });
  }
});

module.exports = {
  addReply,
};
