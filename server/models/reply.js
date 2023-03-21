const mongoose = require("mongoose");
const Post = require("./post");
const User = require("./user");
const Schema = mongoose.Schema;

const replySchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: Post,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", replySchema);
