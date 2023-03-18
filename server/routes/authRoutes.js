const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')
const { requireAuth, preventLoggedInUser } = require('../middlewares/auth') 

//@ desc    Sign up 
//@ access  PUBLIC   
router.post('/signup', preventLoggedInUser, authController.signup)
//@ desc    Login 
//@ access  PUBLIC  
router.post('/login', preventLoggedInUser, authController.login)
//@ desc    Logout
//@ access  PRIVATE   
router.post('/logout', requireAuth, authController.logout);

module.exports = router