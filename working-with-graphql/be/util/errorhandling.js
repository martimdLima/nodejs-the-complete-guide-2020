module.exports.throwError = function (statusCode, message) {
  const error = new Error(message);
  //error.statusCode = statusCode;
  error.code = statusCode;
  throw error;
};

module.exports.authThrowError = function (errors, statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.data = errors.array();
  throw error;
};

module.exports.resolverThrowError = function (errors, statusCode, message) {
  const error = new Error(message);
  error.code = statusCode;
  error.data = errors;
  throw error;
};

module.exports.nextError = function (next, error, statusCode) {
  if (!error.statusCode) {
    error.statusCode = statusCode;
  }
  next(error);
};
