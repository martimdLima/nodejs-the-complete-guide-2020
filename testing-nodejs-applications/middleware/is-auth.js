const jwt = require("jsonwebtoken");
const {
    throwError
  } = require("../util/errorhandling");

module.exports = (req, res, next) => {

    const authHeader = req.get("Authorization");

    if(!authHeader) {
        throwError(401, "Not Authenticated!");
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, "secret"); 
    } catch(err) {
         err.statusCode = 500;
         throw err;
    }

    if(!decodedToken) {
        throwError(401, "Not Authenticated!");
    }

    req.userId = decodedToken.userId;
    next();
}