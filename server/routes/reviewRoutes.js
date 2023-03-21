const express = require('express')
const router = express.Router();
const reviewControllers = require('../controllers/reviewControllers')
const { isAuthenticated } = require("../middlewares/isAuthenticated");

//@ desc    Get one course review by review id
//@ access  PUBLIC   
router.get('/:id', reviewControllers.getReviewByReviewId)
//@ desc    Add a review 
//@ access  PROTECTED   
router.post('/add', isAuthenticated, reviewControllers.addReview);
//@ desc    Update a review 
//@ access  PROTECTED   
router.put('/:id', isAuthenticated, reviewControllers.updateReview);
//@ desc    Delete a review 
//@ access  PROTECTED   
router.delete("/delete/:id", isAuthenticated, reviewControllers.deleteReview);


module.exports = router