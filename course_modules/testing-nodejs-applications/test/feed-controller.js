const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://mdlima:Fp53UihfDIOC0o7a@cluster0.xmtoh.mongodb.net/test-messages?retryWrites=true&w=majority";
const User = require("../models/user");
const Post = require("../models/post");
const FeedController = require("../controllers/feed");

describe("Feed Controller", function () {
  before(function (done) {
    mongoose
      .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((result) => {
        const user = new User({
          email: "dummy@dummy.com",
          password: "dummy",
          name: "dummy",
          posts: [],
          _id: "9c60f11c01f9042b0607a316",
        });

        return user.save();
      })
      .then(() => {
        done();
      });
  });

  /*  
 // runs before every test
 beforeEach(function() {}); 
 */

  it("should add a created post to the posts of the creator", function (done) {

    const req = {
      body: {
        title: "Dummy Post",
        content: "Dummy content",
      },
      file: {
          path: "dummy path"
      },
      userId: "9c60f11c01f9042b0607a316"
    };

    const res = {
        status: function() {
            return this;
        },
        json: function() {}
    }

    FeedController.createPost(req, res, () => {}).then((savedUser) => {
        expect(savedUser).to.have.property("posts");
        expect(savedUser.posts).to.have.length(1);
        done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });

  /*  
 // runs after every test
 afterEach(function() {}); 
 */
});
