const asyncHandler = require('express-async-handler')
const School = require('../models/school')
const Review = require('../models/review')
const Course = require('../models/course')

//@ desc    Handle review queries 
const reviewQueryHandler = asyncHandler(async (req, res) => {
    try {
        const { cid, sid } = req.query;

        if (cid) {
            return getAllReviewsByCourseId(req, res);
        } else if (sid) {
            return getAllReviewsBySchoolId(req, res);
        } else {
            res.status(404).json({ error: "Invalid Query" });
        }
    } catch (error) {
        res.status(404).json(error)
    }
});

//@ desc    Get all course reviews by course ID
//@ route   GET /api/search/review?cid={courseId}
//@ access  PUBLIC  
const getAllReviewsByCourseId = asyncHandler(async (req, res) => {
    
    // retrieve the courseId from the query
    const courseId = req.query.cid; 
    
    try {
        // find reviews with matching courseId
        const reviews = await Review.find({ courseId }); 
        res.json(reviews);
    } catch (error) {
        res.status(404).json(error);
    }
});

//@ desc    Get all course reviews by school ID
//@ route   GET /api/search/review?sid={schoolId}
//@ access  PUBLIC  
const getAllReviewsBySchoolId = asyncHandler(async (req, res) => {

    const schoolId = req.query.sid;
    const courses = await Course.find({ schoolId });
    let reviews = [];

    try {
        for (const course of courses) {
            const courseId = course._id;
            const courseReviews = await Review.find({ courseId });
            reviews.push(...courseReviews);
        }
    
        res.json(reviews);
    } catch (error) {
        res.status(404).json(error);
    }

});

module.exports = {
    reviewQueryHandler, getAllReviewsByCourseId, getAllReviewsBySchoolId
} 