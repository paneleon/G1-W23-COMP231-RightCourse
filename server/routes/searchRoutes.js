const express = require('express')
const router = express.Router();
const searchController = require('../controllers/searchControllers')

//@ desc    Get all reviews of a course with a course ID
router.get('/review', searchController.getAllReviewsByCourseId)
//@ desc    Get courses by schoolId, courseCode, or courseName
router.get('/course', searchController.courseQueryHandler)

module.exports = router