const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
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
