const asyncHandler = require('express-async-handler')
const School = require('../models/school')
const Course = require('../models/course')
const Post = require('../models/post')
const Reply = require('../models/reply')
const Review = require('../models/review')


//@ desc    Get a list of all schools
//@ route   GET /api/school/getAll
//@ access  PUBLIC  
const getAllSchools = asyncHandler(async (req, res) => {
    try {
        const schools = await School.find();
        res.json(schools);
    }
    catch (error) {
        return res.status(500).json(error);
    }
})

//@ desc    Get school by schoolId
//@ route   GET /api/school/:id
//@ access  PUBLIC   
const getSchoolBySchoolId = asyncHandler(async (req, res) => {
    try {
        let school = await School.findById(req.params.id);

        if (school == null) {
            return res.status(404).json({ message: `School with id ${req.params.id} does not exist` });
        }
        res.json(school);
    }
    catch (error) {
        return res.status(500).json(error);
    }
})

//@ desc    Add a school
//@ route   POST /api/school/add
//@ access  PRIVATE   
const addSchool = asyncHandler(async (req, res) => {
    try {
        // check if input school name is unique
        let { schoolName, schoolType, location, description } = req.body;

        const duplicateSchool = await School.find({ schoolName });

        if (duplicateSchool.length > 0) {
            return res
                .status(409)
                .json({ message: `School named ${schoolName} already exists` });
        }

        // save new school to database
        const newSchool = new School({
            schoolName,
            schoolType,
            location,
            description,
        });
        const savedSchool = await newSchool.save();

        res
            .status(201)
            .json({ message: "School added successfully", school: savedSchool });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Unable to add school", error: err.message });
    }
})

//@ desc    Update a school
//@ route   PUT /api/school/update/:id
//@ access  PRIVATE   
const updateSchool = asyncHandler(async (req, res) => {

    try {
        const school = await School.findById(req.params.id);
        if (!school) {
            return res
                .status(404)
                .json({ message: `School with id ${req.params.id} does not exist` });
        }

        const { schoolName, schoolType, location, description } = req.body;

        // check if user who is requesting to update is editor or admin 
        if (!(req.user.role === "editor" || req.user.role === "admin")) {
            return res.status(403).json({ message: "School can be updated by admin or editor" });
        }

        // check duplicate
        const duplicateSchool = await School.find({schoolName});
        
        for(let i = 0; i<duplicateSchool.length; i++){
            if(duplicateSchool[i]._id.toString() !== req.params.id){
                return res
                .status(409)
                .json({ message: `School named ${schoolName} already exists` });
            }
        }
        
        await School.findByIdAndUpdate(req.params.id, {
            schoolName,
            schoolType,
            location,
            description
        });

        res.status(201).json({ message: "School updated successfully" })
    } catch (err) {
        res
            .status(500)
            .json({ message: "Unable to update school", error: err.message });
    }
})

//@ desc    Delete a school
//@ route   DELETE /api/school/delete/:id
//@ access  PRIVATE   
const deleteSchool = asyncHandler(async (req, res) => {
    try {
        // check if school exists
        const schoolId = req.params.id;
        const school = await School.findById(schoolId);

        if (!school) {
            return res
                .status(404)
                .json({ message: `School with id ${schoolId} does not exist` });
        }

        const courses = await Course.find({ schoolId });
        for (let i = 0; i < courses.length; i++) {
            const courseId = courses[i]._id;

            const posts = await Post.find({ courseId });
            for (let j = 0; j < posts.length; j++) {
                const postId = posts[j]._id;

                // delete replies
                await Reply.deleteMany({ postId });
            }
            // delete post 
            await Post.deleteMany({ courseId });

            // delete reviews
            await Review.deleteMany({ courseId });
        }
        // delete courses
        await Course.deleteMany({ schoolId });

        // delete school
        await School.findByIdAndDelete(schoolId);

        res.status(201).json({ message: "School deleted successfully" });
    } catch (err) {
        console.log(err);
        res
            .status(500)
            .json({ message: "Unable to delete school", error: err.message });
    }
})

module.exports = {
    getSchoolBySchoolId, addSchool, getAllSchools, updateSchool, deleteSchool
}

