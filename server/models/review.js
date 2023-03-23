const mongoose = require("mongoose");
const Course = require("./course");
const User = require("./user");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: Course,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    professorName: {
      type: String,
    },
    mainTopics: {
      type: String,
    },
    comment: {
      type: String,
    },
    effectiveness: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
