const express = require('express')
const router = express.Router();
const searchController = require('../controllers/searchControllers')

//@ desc    Get all reviews of a course with a course ID
router.get('/review', searchController.reviewQueryHandler)


module.exports = router