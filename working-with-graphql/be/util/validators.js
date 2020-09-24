const validator = require("validator");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { throwError } = require("../util/errorhandling");

validateUser = function (user) {
  if (!user) {
    throwError(404, "No user found!");
  }
};

validateUserAuth = function (req) {
  if (!req.isAuth) {
    throwError(401, "No posts found!");
  }
};

validatePost = function (post, req) {
  if (!post) {
    throwError(404, "No Post found!");
  }

  if (post.creator._id.toString() !== req.userId.toString()) {
    throwError(401, "Not Authorized!");
  }
};

module.exports = {
  validateUserCreation: async function (userInput) {
    const errors = [];

    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: "E-Mail is invalid." });
    }

    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: "Password too short!" });
    }

    if (errors.length > 0) {
      throwError(errors, 422, "Invalid input!");
    }

    const existingUser = await User.findOne({ email: userInput.email });

    if (existingUser) {
      const error = new Error("User already exists!");
      throw error;
    }
  },
  validateUserLogin: async function (user, password) {
    if (!user) {
      throwError(401, "User not found!");
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throwError(401, "Password is incorrect!");
    }
  },
  validatePostCreation: async function (postInput, req) {
    this.validateUserAuth(req);

    const errors = [];

    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({ message: "Title is invalid." });
    }

    if (
      validator.isEmpty(postInput.content) ||
      !validator.isLength(postInput.content, { min: 5 })
    ) {
      errors.push({ message: "Content is invalid." });
    }

    if (errors.length > 0) {
      throwError(errors, 422, "Invalid input!");
    }
  },
  validatePostUpdate: async function (postInput) {
    const errors = [];

    if (
      validator.isEmpty(postInput.title) ||
      !validator.isLength(postInput.title, { min: 5 })
    ) {
      errors.push({ message: "Title is invalid." });
    }

    if (
      validator.isEmpty(postInput.content) ||
      !validator.isLength(postInput.content, { min: 5 })
    ) {
      errors.push({ message: "Content is invalid." });
    }

    if (errors.length > 0) {
      throwError(422, "Invalid input!");
    }
  },
  validateUser,
  validateUserAuth,
  validatePost,
};
