const express = require("express");
const authenticationController = require("../controller/authenticationController");

const userController = require("../controller/userController");

const router = express.Router();

//Email user
router.route("/email").post(authenticationController.sendEmail);

//Create new user in DB
//Signup User
router.post("/signup", authenticationController.signUp);

//Get User dashboard
router.post("/login", authenticationController.login);

//Get all users
router.get("/allusers", userController.getAllUsers);

module.exports = router;
