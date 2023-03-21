const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')
const { requireAuth, preventLoggedInUser } = require('../middlewares/auth') 
const { isAuthenticated } = require("../middlewares/isAuthenticated");

//@ desc    Sign up 
//@ access  PUBLIC   
router.post('/signup', preventLoggedInUser, authController.signup)
//@ desc    Login 
//@ access  PUBLIC  
router.post('/login', preventLoggedInUser, authController.login)
//@ desc    Logout
//@ access  PRIVATE   
router.post('/logout', requireAuth, authController.logout);

//@ desc    Get current user
//@ access  PRIVATE
router.get("/me", isAuthenticated, authController.getCurrentUser);

module.exports = router