const express = require('express')
const router = express.Router();
const reviewControllers = require('../controllers/reviewControllers')

//@ desc    Get one course review by review id
router.get('/:id', reviewControllers.getReviewByReviewId)

module.exports = router