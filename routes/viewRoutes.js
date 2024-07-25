const express = require("express");

// import { User } from "../model/userModel";
// import { viewController } from "../controller/viewController";
const viewController = require("../controller/viewController");
const authenticationController = require("../controller/authenticationController");

const router = express.Router();

// router.route("/").get((req, res) => {
//   // res.status(200).send("<h1>Home Page</h1>");
//   res.status(200).render("base");
// });

router.get("/", viewController.getMainLayout);
//Login User
router.get("/login", viewController.getLogin);

module.exports = router;
