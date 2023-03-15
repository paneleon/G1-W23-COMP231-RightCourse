const asyncHandler = require('express-async-handler')
const School = require('../models/school')
const Review = require('../models/review')
const Course = require('../models/course')

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



//@ desc    Get school by schoolName
//@ route   GET /api/search/school?schoolName={schoolName}
//@ access  PUBLIC   
const getSchoolBySchoolName = asyncHandler(async (req, res) => {
    
    // retrieve the schoolName from the query
    const schoolName = req.query.schoolName;

    try {
        // find courses containing course name (case insensitive)
        const schools = await School.find({ schoolName: { $regex: new RegExp(schoolName, "i") } });
        res.json(schools);
    } catch (error) {
        res.status(404).json(error);
    }
})



//@ desc    Handle review search queries 
//@ route   /api/search/review?{query}={}
//@ access  PUBLIC   
const courseQueryHandler = asyncHandler(async (req, res) => {
    try {
        const { sid, courseCode, courseName } = req.query;

        if (sid) {
            return getCourseBySchoolId(req, res);
        } else if (courseCode) {
            return getCourseByCourseCode(req, res);
        } else if (courseName) {
            return getCourseByCourseName(req, res);
        } else {
            res.status(404).json({ error: "Invalid Query" });
        }
    } catch (error) {
        res.status(404).json(error)
    }
});

//@ desc    Get courses by schoolId
//@ route   GET /api/search/course?sid={schoolId}
//@ access  PUBLIC   
const getCourseBySchoolId = asyncHandler(async (req, res) => {

    // retrieve the schoolID from the query
    const schoolId = req.query.sid;

    try {
        // find courses matching schoolId
        const courses = await Course.find({ schoolId });
        res.json(courses);
    } catch (error) {
        res.status(404).json(error);
    }
})

//@ desc    Get courses by courseCode
//@ route   GET /api/search/course?courseCode={courseCode}
//@ access  PUBLIC   
const getCourseByCourseCode = asyncHandler(async (req, res) => {

    const courseCode = req.query.courseCode

    try {
        // find courses matching course code (case insensitive)
        const courses = await Course.find({ courseCode: { $regex: new RegExp(courseCode, "i") } });
        res.json(courses);
    } catch (error) {
        res.status(404).json(error);
    }
})

//@ desc    Get courses by courseName
//@ route   GET /api/search/course?courseName={courseName}
//@ access  PUBLIC   
const getCourseByCourseName = asyncHandler(async (req, res) => {

    const courseName = req.query.courseName

    try {
        // find courses containing course name (case insensitive)
        const courses = await Course.find({ courseName: { $regex: new RegExp(courseName, "i") } });
        res.json(courses);
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = {
    getAllReviewsByCourseId, getSchoolBySchoolName, courseQueryHandler
} 