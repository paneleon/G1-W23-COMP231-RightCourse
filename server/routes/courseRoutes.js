const express = require('express')
const router = express.Router();
const courseControllers = require('../controllers/courseControllers');
const { isAuthenticated } = require('../middlewares/isAuthenticated');
const { isAdmin } = require('../middlewares/isAdmin');

//@ desc    Add new course
//@ access  PROTECTED
router.post('/add', isAuthenticated, isAdmin, courseControllers.addCourse);
//@ desc    Update course
//@ access  PROTECTED
router.put('/update/:id', isAuthenticated, courseControllers.updateCourse);
//@ desc    Delete course
//@ access  PROTECTED
router.delete('/delete/:id', isAuthenticated, isAdmin, courseControllers.deleteCourse);
//@ desc    Get course by courseId
//@ access  PROTECTED
router.get('/:id', courseControllers.getCourseByCourseId)

module.exports = router