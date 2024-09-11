const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJwt = require("../verifyJwt");

//get user
router.get("/user/:id", verifyJwt, userController.getUser);

// update user
router.post("/user/:id", verifyJwt, userController.updateUser);

//delete user
router.delete("/user/:id", verifyJwt, userController.deleteUser);

module.exports = router;
