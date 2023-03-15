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

module.exports = {
    getCourseByCourseId,
}