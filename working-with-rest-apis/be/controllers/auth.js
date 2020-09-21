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
      nextError(err, 500);
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

      res.status(200).json({token: token, userId: loadedUser._id.toString()});
    })
    .catch((err) => {
      nextError(err, 500);
    });
};
