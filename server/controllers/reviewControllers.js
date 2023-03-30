const asyncHandler = require("express-async-handler");
const Course = require("../models/course");
const Review = require("../models/review");

//@ desc    Get one course review by review id
//@ route   GET /api/review/:id
//@ access  PUBLIC
const getReviewByReviewId = asyncHandler(async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);

    if (review == null) {
      return res
        .status(404)
        .json({ message: `Review with id ${req.params.id} does not exist` });
    }
    res.json(review);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//@ desc    Add a review
//@ route   POST /api/review/add
//@ access  PRIVATE
const addReview = asyncHandler(async (req, res) => {
  try {
    const { courseId, professorName, mainTopics, comment, effectiveness } =
      req.body;

    // Create new review object
    const newReview = new Review({
      courseId,
      userId: req.user._id,
      professorName,
      mainTopics,
      comment,
      effectiveness,
    });

    // increase review count for course and caculate new average effectiveness rating
    const course = await Course.findById(courseId);
    course.totalReviews += 1;
    course.averageRating =
      (course.averageRating * (course.totalReviews - 1) +
        Number(effectiveness)) /
      course.totalReviews;
    await course.save();

    // Save new review to database
    const savedReview = await newReview.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: savedReview });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to add review", error: err.message });
  }
});

//@ desc    Update a review
//@ route   PUT /api/review/update/:id
//@ access  PRIVATE
const updateReview = asyncHandler(async (req, res) => {
  try {
    // update review with id and recalculate average effectiveness and total reviews for course
    const { professorName, mainTopics, comment, effectiveness } = req.body;
    const review = await Review.findById(req.params.id);
    const course = await Course.findById(review.courseId);

    if (!review) {
      return res
        .status(404)
        .json({ message: `Review with id ${req.params.id} does not exist` });
    }

    // check if review author and user who is requesting to update it match
    if(req.user._id!==review.userId.toString()){
      return res.status(403).json({ message: "Review can be updated by the author" });
    }

    course.totalReviews -= 1;
    course.averageRating =
      (course.averageRating * (course.totalReviews + 1) -
        Number(review.effectiveness)) /
        course.totalReviews || 0;
    course.totalReviews += 1;
    course.averageRating =
      (course.averageRating * (course.totalReviews - 1) +
        Number(effectiveness)) /
      course.totalReviews;
    await course.save();
    await Review.findByIdAndUpdate(req.params.id, {
      professorName,
      mainTopics,
      comment,
      effectiveness,
    });

    res.status(201).json({ message: "Review updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Unable to update review", error: err.message });
  }
});

//@ desc    Delete a review
//@ route   DELETE /api/review/delete
//@ access  PRIVATE
const deleteReview = asyncHandler(async (req, res) => {
  try {
    // delete review with id and decrease review count for course and caculate new average effectiveness
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res
        .status(404)
        .json({ message: `Review with id ${req.params.id} does not exist` });
    }

    // check if review author and user who is requesting to delete it match
    if(req.user._id!==review.userId.toString()){
      return res.status(403).json({ message: "Review can be deleted by the author" });
    }

    const course = await Course.findById(review.courseId);
    console.log(course);
    course.totalReviews -= 1;
    course.averageRating =
      (course.averageRating * (course.totalReviews + 1) -
        Number(review.effectiveness)) /
        course.totalReviews || 0;
    console.log(course.averageRating);

    await course.save();
    await Review.findByIdAndDelete(req.params.id);

    res.status(201).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Unable to delete review", error: err.message });
  }
});

module.exports = {
  getReviewByReviewId,
  addReview,
  updateReview,
  deleteReview,
};
