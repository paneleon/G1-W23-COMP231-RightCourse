const asyncHandler = require('express-async-handler')
const School = require('../models/school')

//@ desc    Get school by schoolId
//@ route   GET /api/school/:id
//@ access  PUBLIC   
const getSchoolBySchoolId = asyncHandler(async (req, res) => {
    try{
        let school = await School.findById(req.params.id);

        if(school==null) {
            return res.status(404).json({message: `School with id ${req.params.id} does not exist`});
        }
        res.json(school);
    }
    catch(error){
        return res.status(500).json(error);
    }
})

//@ desc    Add a school
//@ route   GET /api/school/add
//@ access  PRIVATE   
const addSchool = asyncHandler(async (req, res) => {
    try{
        // check if input school name is unique
        let { schoolName, schoolType, location, description} = req.body;

        const duplicateSchool = await School.find({schoolName});

        if(duplicateSchool.length>0) {
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

module.exports = {
    getSchoolBySchoolId, addSchool
}

