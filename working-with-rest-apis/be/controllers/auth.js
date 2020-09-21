const { validationResult } = require("express-validator");
const { authThrowError } = require("../util/errorhandling");

const User = require("../models/user");

exports.signup = (req, res, next) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      authThrowError(errors, 422, "Validation Failed");
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

}