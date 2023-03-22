const express = require("express");
const router = express.Router();
const replyControllers = require("../controllers/replyControllers");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

//@ desc    Add a reply
//@ access  PROTECTED
router.post("/add", isAuthenticated, replyControllers.addReply);

module.exports = router;
