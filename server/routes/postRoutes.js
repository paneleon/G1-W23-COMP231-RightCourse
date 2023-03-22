const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/postControllers");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

//@ desc    Get All Posts
//@ access  PUBLIC
router.get("/getAll", postControllers.getAllPosts);
//@ desc    Get one post by id
//@ access  PUBLIC
router.get("/getOne/:id", postControllers.getOnePost);
//@ desc    Add a reply
//@ access  PROTECTED
router.post("/add", isAuthenticated, postControllers.addNewPost);

module.exports = router;