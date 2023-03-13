const asyncHander = require('express-async-handler')

//@ desc    Get all course review of a course
//@ route   GET --TBD
//@ access  PUBLIC  
const getReviewByCourse = asyncHander(async (req, res) => {
    // Methods to be implemented...
})

//@ desc    Get one course review by review id
//@ route   GET --TBD
//@ access  PUBLIC   
const getReviewByReviewId = asyncHander(async (req, res) => {
    // Methods to be implemented...
})

//@ desc    Get course reviews by topic
//@ route   GET --TBD
//@ access  PUBLIC   
const getReviewByTopic = asyncHander(async (req, res) => {
    // Methods to be implemented...
})

//@ desc    Get course reviews by professor name
//@ route   GET --TBD
//@ access  PUBLIC   
const getReviewByProfessor = asyncHander(async (req, res) => {
    // Methods to be implemented...
})

//@ desc    Get course reviews by comments
//@ route   GET --TBD
//@ access  PUBLIC   
const getReviewByComment = asyncHander(async (req, res) => {
    // Methods to be implemented...
})



module.exports = {
    getReviewByCourse, getReviewByReviewId, getReviewByProfessor, getReviewByTopic, getReviewByComment
}