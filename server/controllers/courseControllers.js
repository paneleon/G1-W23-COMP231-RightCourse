const asyncHandler = require('express-async-handler')
const Course = require('../models/course')

//@ desc    Get course by courseId
//@ route   GET /api/course/:id
//@ access  PUBLIC   
const getCourseByCourseId = asyncHandler(async (req, res) => {
    try{
        let course = await Course.findById(req.params.id);

        if(course==null) {
            return res.status(404).json({message: `Course with id ${req.params.id} does not exist`});
        }
        res.json(course);
    }
    catch(error){
        return res.status(500).json(error);
    }
})

//@ desc    Get courses by courseCode
//@ route   GET --TBD
//@ access  PUBLIC   
const getCourseByCourseCode = asyncHandler(async (req, res) => {
    // Methods to be implemented...
})

//@ desc    Get courses by courseName
//@ route   GET --TBD
//@ access  PUBLIC   
const getCourseByCourseName = asyncHandler(async (req, res) => {
    // Methods to be implemented...
})

//@ desc    Get courses by schoolId
//@ route   GET --TBD
//@ access  PUBLIC   
const getCourseBySchoolId = asyncHandler(async (req, res) => {
    // Methods to be implemented...
})


module.exports = {
    getCourseByCourseId, getCourseByCourseCode, getCourseByCourseName, getCourseBySchoolId
}