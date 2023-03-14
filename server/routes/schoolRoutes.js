const express = require('express')
const router = express.Router();
const schoolControllers = require('../controllers/schoolControllers')

//@ desc    Get school by schoolId
router.get('/:id', schoolControllers.getSchoolBySchoolId)

module.exports = router