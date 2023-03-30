const express = require('express')
const router = express.Router();
const schoolControllers = require('../controllers/schoolControllers')
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");

//@ desc    Get school by schoolId
//@ access  PUBLIC 
router.get('/:id', schoolControllers.getSchoolBySchoolId)
//@ desc    Add a school 
//@ access  PROTECTED   
router.post('/add', isAuthenticated, isAdmin, schoolControllers.addSchool);

module.exports = router