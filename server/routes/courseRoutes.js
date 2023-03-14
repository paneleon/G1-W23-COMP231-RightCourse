const express = require('express')
const router = express.Router();
const courseControllers = require('../controllers/courseControllers')

//@ desc    Get course by courseId
router.get('/:id', courseControllers.getCourseByCourseId)

module.exports = router