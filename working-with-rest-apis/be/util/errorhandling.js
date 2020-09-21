module.exports.throwError = function (statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

module.exports.authThrowError = function (errors, statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.data = errors.array();
  throw error;
};

module.exports.nextError = function (error, statusCode) {
  if (error.statusCode) {
    error.statusCode = statusCode;
  }

  next(error);
};
