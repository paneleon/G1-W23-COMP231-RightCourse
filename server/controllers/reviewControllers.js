const asyncHandler = require('express-async-handler')
const Review = require('../models/review')

//@ desc    Get one course review by review id
//@ route   GET /api/review/:id
//@ access  PUBLIC   
const getReviewByReviewId = asyncHandler(async (req, res) => {

    try{
        let review = await Review.findById(req.params.id);

        if(review==null) {
            return res.status(404).json({message: `Review with id ${req.params.id} does not exist`});
        }
        res.json(review);
    }
    catch(error){
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

module.exports = {
    getReviewByReviewId, addReview
}