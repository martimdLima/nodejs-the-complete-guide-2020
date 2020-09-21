const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.put("/signup", [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(
            "Email address already exists, please enter a valid email."
          );
        }
      });
    })
    .normalizeEmail(),
  body("password").trim().isLength({min: 5}),
  body("name").trim().isEmpty(),
],
authController.signup);

module.exports = router;
