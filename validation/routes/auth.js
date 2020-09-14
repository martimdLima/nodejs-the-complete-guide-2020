const express = require("express");
const { check, validationResult } = require("express-validator/check");

const router = express.Router();

const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  check("email").isEmail().withMessage("Please enter a valid email!")
  .custom((value, {}) => {
    if(value === "tester@tester.com") {
        throw new Error("This email address is reserved for testers");
    }
    return true;
  }),
  authController.postSignup
);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
