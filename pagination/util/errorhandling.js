module.exports.errHandling = function (err) {
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
};
