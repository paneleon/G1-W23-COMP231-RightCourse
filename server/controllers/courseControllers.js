const asyncHandler = require("express-async-handler");
const Course = require("../models/course");
const review = require("../models/review");

//@ desc    Get course by courseId
//@ route   GET /api/course/:id
//@ access  PUBLIC
const getCourseByCourseId = asyncHandler(async (req, res) => {
  try {
    let course = await Course.findById(req.params.id).populate("schoolId");

    if (course == null) {
      return res
        .status(404)
        .json({ message: `Course with id ${req.params.id} does not exist` });
    }
    const reviews = await review
      .find({ courseId: req.params.id })
      .populate("userId");
    res.json({ course, reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = {
  getCourseByCourseId,
};
