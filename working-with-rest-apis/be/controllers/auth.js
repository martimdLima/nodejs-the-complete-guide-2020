const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");
const { nextError, authThrowError } = require("../util/errorhandling");

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
    .then(result => {
        console.log(result);
        res.status(201).json({message: "User created", userId: result._id});
    })
    .catch((err) => {
      nextError(err, 500);
    });
};
