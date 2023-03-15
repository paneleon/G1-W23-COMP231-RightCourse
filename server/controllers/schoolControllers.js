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

module.exports = {
    getSchoolBySchoolId
}

