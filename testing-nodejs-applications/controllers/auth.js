const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const {
  nextError,
  throwError,
  authThrowError,
} = require("../util/errorhandling");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    authThrowError(errors, 422, "Validation Failed");
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      name: name,
    });

    const result = await user.save();
    console.log(result);
    res.status(201).json({ message: "User created", userId: result._id });
  } catch (err) {
    nextError(next, err, 500);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      throwError(401, "A user with this email couldn't be found.");
    }

    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throwError(401, "Wrong password!");
    }

    const token = jwt.sign(
      { email: loadedUser.email, userId: loadedUser._id.toString() },
      "secret",
      { expiresIn: "5h" }
    );

    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    return;
  } catch (err) {
    nextError(next, err, 500);
    return err;
  }
};

exports.getUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      throwError(404, "Couldn't find any user that met the criteria.");
    }

    const status = user.status;
    res.status(200).json({ status: status });
  } catch (err) {
    nextError(next, err, 500);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  const newStatus = req.body.status;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      throwError(404, "Couldn't find any user that met the criteria.");
    }

    user.status = newStatus;
    const result = await user.save();

    res.status(200).json({ message: "User updated." });
  } catch (err) {
    nextError(next, err, 500);
  }
};
