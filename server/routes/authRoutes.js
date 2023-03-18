const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')
const { requireAuth } = require('../middlewares/auth') 

//@ desc    Sign up 
//@ access  PUBLIC   
router.post('/signup', authController.signup)
//@ desc    Login 
//@ access  PUBLIC  
router.post('/login', authController.login)
//@ desc    Logout
//@ access  PRIVATE   
router.post('/logout', requireAuth, authController.logout);

module.exports = router