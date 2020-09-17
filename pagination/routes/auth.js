const express = require("express");
const { check, body } = require("express-validator");

const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .normalizeEmail()
      .custom((value, {}) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject("Invalid User, please provide a valid user");
          }
          return true;
        });
      }),
    body(
      "password",
      "Please enter a alphanumeric password that's at least 6 characters long."
    )
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .normalizeEmail()
      .custom((value, {}) => {
        /*         if (value === "tester@tester.com") {
          throw new Error("This email address is reserved for testers");
        }
        return true; */
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email already exists in the database, please choose a different one"
            );
          }
        });
      }),
    body(
      "password",
      "Please enter a alphanumeric password that's at least 6 characters long."
    )
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match! Please try again");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
