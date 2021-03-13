const expect = require("chai").expect;
const sinon = require("sinon");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/is-auth");

describe("Auth Middleware", function () {
  it("should throw a error if no authorization header is present", function () {
    const req = {
      get: function (headerName) {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not Authenticated!"
    );
  });

  it("should throw an error if the authorization header is not the only one string", function () {
    const req = {
      get: function (headerName) {
        return "xyz";
      },
    };

    expect(authMiddleware.bind(this, req, () => {})).to.throw();
  });

  it("should yoeld a userID after decoding the token", function () {
    const req = {
      get: function (headerName) {
        return "Bearer xysdsdsadfgz";
      },
    };

    sinon.stub(jwt, "verify");

    jwt.verify.returns({
        userId: "abc"
    });

    authMiddleware(req, {}, () => {});

    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });

  it("Should throw an error if the token cannot be verified", function () {
    const req = {
      get: function (headerName) {
        return "Bearer xyz";
      },
    };

    expect(authMiddleware.bind(this, req, () => {})).to.throw();

  });
});
