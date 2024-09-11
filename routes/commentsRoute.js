const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const verifyJwt = require("../verifyJwt");

// add comment
router.post("/comment", verifyJwt, commentController.addComment);

// update comment
router.put("/comment", verifyJwt, commentController.updateComment);

//delete comment
router.delete("/comment", verifyJwt, commentController.deleteComment);

//get all comments of a post
router.get("/comment", verifyJwt, commentController.allComments);

module.exports = router;
