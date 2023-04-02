const express = require('express')
const router = express.Router();
const schoolControllers = require('../controllers/schoolControllers')
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

//@ desc    Get all schools
//@ access  PUBLIC 
router.get('/getAll', schoolControllers.getAllSchools)
//@ desc    Add a school 
//@ access  PROTECTED   
router.post('/add', isAuthenticated, isAdmin, schoolControllers.addSchool);
//@ desc    update a school 
//@ access  PROTECTED   
router.put('/update/:id', isAuthenticated, schoolControllers.updateSchool);
//@ desc    Delete a school 
//@ access  PROTECTED   
router.delete('/delete/:id', isAuthenticated, isAdmin, schoolControllers.deleteSchool);
//@ desc    Get school by schoolId
//@ access  PUBLIC 
router.get('/:id', schoolControllers.getSchoolBySchoolId)

module.exports = router