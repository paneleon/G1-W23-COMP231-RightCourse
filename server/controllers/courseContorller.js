const asyncHander = require('express-async-handler')

//@ desc    Get course by CourseId
//@ route   GET /api/course/:id
//@ access  PUBLIC   
const getCourseById = asyncHander(async (req, res) => {
    // Methods to be implemented...
})

module.exports = {
    getCourseById
}