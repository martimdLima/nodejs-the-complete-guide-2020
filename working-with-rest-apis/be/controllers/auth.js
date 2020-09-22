const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const {
  nextError,
  throwError,
  authThrowError,
} = require("../util/errorhandling");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    authThrowError(errors, 422, "Validation Failed");
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
      });

      return user.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "User created", userId: result._id });
    })
    .catch((err) => {
      nextError(next, err, 500);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throwError(401, "A user with this email couldn't be found.");
      }

      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        throwError(401, "Wrong password!");
      }

      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser._id.toString() },
        "secret",
        { expiresIn: "5h" }
      );

      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      nextError(next, err, 500);
    });
};

exports.getUserStatus = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        throwError(404, "Couldn't find any user that met the criteria.");
      }

      const status = user.status;
      res.status(200).json({ status: status });
    })
    .catch((err) => {
      nextError(next, err, 500);
    });
};

exports.updateUserStatus = (req, res, next) => {
  const newStatus = req.body.status;

  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        throwError(404, "Couldn't find any user that met the criteria.");
      }

      user.status = newStatus;
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "User updated." });
    })
    .catch((err) => {
      nextError(next, err, 500);
    });
};
