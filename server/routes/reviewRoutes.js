const express = require('express')
const router = express.Router();
const reviewControllers = require('../controllers/reviewControllers')

router.get('/:id', reviewControllers.getReviewByReviewId)

module.exports = router