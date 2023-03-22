const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;
const Course = require("./course");
const postSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: Course,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    totalReplies: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
