module.exports.throwError = function (statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

module.exports.nextError = function (error, statusCode) {
  if (error.statusCode) {
    error.statusCode = statusCode;
  }

  next(error);
};
