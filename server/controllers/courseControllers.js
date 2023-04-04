const asyncHandler = require("express-async-handler");
const Course = require("../models/course");
const Review = require("../models/review");
const Post = require("../models/post");
const Reply = require("../models/reply");

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
    const reviews = await Review
      .find({ courseId: req.params.id })
      .populate("userId");
    res.json({ course, reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//@ desc    Add a course
//@ route   POST /api/course/add
//@ access  PRIVATE
const addCourse = asyncHandler(async (req, res) => {
  try {
    let { schoolId, courseName, courseCode, description } = req.body;

    // check if input course code is unique
    const duplicatedCourse = await Course.find({ schoolId, courseCode });

    if (duplicatedCourse.length > 0) {
      return res
        .status(409)
        .json({ message: `Course with code ${courseCode} already exists` });
    }

    // save new course to database
    const newCourse = new Course({
      schoolId,
      courseName,
      courseCode,
      description,
    });

    const savedCourse = await newCourse.save();
    res
      .status(201)
      .json({ message: `Course ${courseName} added successfully`, course: savedCourse });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to add course", error: err.message });
  }
});

//@ desc    Update a course
//@ route   PUT /api/course/update/:id
//@ access  PRIVATE
const updateCourse = asyncHandler(async (req, res) => {
  try {

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course with id ${req.params.id} does not exist` });
    }

    let { schoolId, courseName, courseCode, description } = req.body;

    // check if user who is requesting to update course is editor or admin
    if (!(req.user.role === "editor" || req.user.role === "admin")) {
      return res.status(403).json({ message: "School can be updated by admin or editor" });
    }

    // check duplicate 
    const duplicatedCourse = await Course.find({ schoolId, courseCode });
        
    for(let i = 0; i<duplicatedCourse.length; i++){
      if(duplicatedCourse[i]._id.toString() !== req.params.id){
          return res
          .status(409)
          .json({ message: `Course with code ${courseCode} already exists` });
      }
    }

    await Course.findByIdAndUpdate(req.params.id, {
      schoolId,
      courseName,
      courseCode,
      description,
    });

    res.status(200).json({ message: "Course updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to update course", error: err.message });
  }
});

//@ desc    Delete a course
//@ route   DELETE /api/course/delete/:id
//@ access  PRIVATE
const deleteCourse = asyncHandler(async (req, res) => {
  try {
    // check if course exists
    const courseId = req.params.id;
    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ message: `Course with id ${courseId} does not exist` });
    }

    const posts = await Post.find({ courseId });
    for (let i = 0; i < posts.length; i++) {
      const postId = posts[i]._id;

      // Delete replies
      await Reply.deleteMany({ postId });
    }

    // delete posts
    await Post.deleteMany({ courseId });

    // delete reviews
    await Review.deleteMany({ courseId });

    // delete course
    await Course.findByIdAndDelete(courseId);

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to delete course", error: err.message });
  }
});

module.exports = {
  getCourseByCourseId, addCourse, updateCourse, deleteCourse
};
