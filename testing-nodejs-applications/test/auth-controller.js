const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://mdlima:Fp53UihfDIOC0o7a@cluster0.xmtoh.mongodb.net/test-messages?retryWrites=true&w=majority";
const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller - Login", function () {
  it("Should throw an error if acessing the database fails", function (done) {
    sinon.stub(User, "findOne");

    User.findOne.throws();

    const req = {
      body: {
        email: "dummy@dummy.com",
        password: "dummy",
      },
    };

    AuthController.login(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    });

    User.findOne.restore();
  });

  it("should send a response with a valid user status for an existing user", function (done) {
    mongoose
      .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((result) => {
        const user = new User({
          email: "dummy@dummy.com",
          password: "dummy",
          name: "dummy",
          posts: [],
          _id: "9c60f11c01f4752b0607a316",
        });

        return user.save();
      })
      .then(() => {
        const req = { userId: "9c60f11c01f4752b0607a316" };
        const res = {
          statusCode: 500,
          userStatus: null,
          status: function (code) {
            this.statusCode = code;
            return this;
          },
          json: function (data) {
            this.userStatus = data.status;
          },
        };

        AuthController.getUserStatus(req, res, () => {}).then(() => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.userStatus).to.be.equal("this is a new post");
            done();
        })
      })
      .catch((err) => console.log(err));
  });
});
