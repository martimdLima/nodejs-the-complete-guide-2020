module.exports.feedThrowError = function (statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

module.exports.feedNextError = function (error, statusCode) {
  if (error.statusCode) {
    error.statusCode = statusCode;
  }

  next(error);
};

module.exports.authThrowError = function (errors, statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.data = errors.array();
  throw error;
}
