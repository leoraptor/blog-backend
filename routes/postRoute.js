const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");
const verifyJwt = require("../verifyJwt");

//get post
router.get("/post", verifyJwt, PostController.getPost);

//get all post
router.get("/posts", verifyJwt, PostController.allPost);

//get posts of the user only
router.get("/posts/:id", verifyJwt, PostController.allPostOfUser);

// add post
router.post("/post", verifyJwt, PostController.addPost);

// update post
router.put("/post", verifyJwt, PostController.updatePost);

//delete post
router.delete("/post", verifyJwt, PostController.deletePost);

module.exports = router;
