const bcrypt = require("bcryptjs");

module.exports.hashPassword = function (password, saltRounds) {
  return bcrypt.hash(password, saltRounds);
};

module.exports.validatePassword = function (user, password) {
  return bcrypt.compare(password, user.password);
};
