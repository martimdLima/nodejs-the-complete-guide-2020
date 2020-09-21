const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { nextError, throwError } = require("../util/errorhandling");

const User = require("../models/user");