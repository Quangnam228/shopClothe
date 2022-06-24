const router = require("express").Router();
// const User = require("../models/User");
// const argon2 = require("argon2");
// const jwt = require("jsonwebtoken");
const authController = require("../controller/authController");

// Register
router.post("/register", authController.register);
router.post("/register/admin", authController.registerAdmin);

//login
router.post("/login", authController.login);
module.exports = router;
