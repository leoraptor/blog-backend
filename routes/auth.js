const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register
router.post("/register", authController.userRegister);

// Login;
router.post("/login", authController.userLogin);

// Logout
router.post("/logout", authController.userLogout);

module.exports = router;
