const asyncHandler = require('express-async-handler')
const Review = require('../models/review')

//@ desc    Get one course review by review id
//@ route   GET /api/review/:id
//@ access  PUBLIC   
const getReviewByReviewId = asyncHandler(async (req, res) => {

  try {
    let review = await Review.findById(req.params.id);

    if (review == null) {
      return res.status(404).json({ message: `Review with id ${req.params.id} does not exist` });
    }
    res.json(review);
  }
  catch (error) {
    return res.status(500).json(error);
  }

})

//@ desc    Add a review 
//@ route   POST /api/review/add
//@ access  PRIVATE   
const addReview = asyncHandler(async (req, res) => {
  try {
    const { courseId, professorName, mainTopics, comments, effectiveness } = req.body;

    // Create new review object
    const newReview = new Review({
      courseId,
      userId: req.user._id,
      professorName,
      mainTopics,
      comments,
      effectiveness,
    });

    // Save new review to database
    const savedReview = await newReview.save();

    res.status(201).json({ message: 'Review added successfully', review: savedReview });
  } catch (err) {
    res.status(500).json({ message: 'Unable to add review', error: err.message });
  }
});

//@ desc    Update a review 
//@ route   PUT /api/review/:id
//@ access  PRIVATE   
const updateReview = asyncHandler(async (req, res) => {
  try {
    const { courseId, professorName, mainTopics, comments, effectiveness } = req.body;
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: `Review with id ${reviewId} does not exist` });
    }

    if (review.userId.toString() !== userId.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    review.courseId = courseId;
    review.professorName = professorName;
    review.mainTopics = mainTopics;
    review.comments = comments;
    review.effectiveness = effectiveness;

    const updatedReview = await review.save();

    res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (err) {
    res.status(500).json({ message: 'Unable to update review', error: err.message });
  }
});

module.exports = {
  getReviewByReviewId, addReview, updateReview
}