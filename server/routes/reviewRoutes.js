const express = require('express')
const router = express.Router();
const reviewControllers = require('../controllers/reviewControllers')
const { requireAuth } = require('../middlewares/auth')

//@ desc    Get one course review by review id
//@ access  PUBLIC   
router.get('/:id', reviewControllers.getReviewByReviewId)
//@ desc    Add a review 
//@ access  PROTECTED   
router.post('/add', requireAuth, reviewControllers.addReview);
//@ desc    Update a review 
//@ access  PROTECTED   
router.put('/:id', requireAuth, reviewControllers.updateReview);



module.exports = router