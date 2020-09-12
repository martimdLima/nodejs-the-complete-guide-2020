const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3b2beedcae5cb6",
    pass: "818a5350e176b3",
  },
});

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  /*   transporter.verify(function(error, success) {
    if (error) {
         console.log(error);
    } else {
         console.log('Server is ready to take our messages');
    }
  }); */

  let errMsg = req.flash("error");

  if (errMsg.length > 0) {
    errMsg = errMsg[0];
  } else {
    errMsg = null;
  }

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login Page",
    errorMessage: errMsg,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid credentials");
        return res.redirect("/login");
      }

      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          } else {
            req.flash("error", "Invalid credentials");
            res.redirect("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  let errMsg = req.flash("error");

  if (errMsg.length > 0) {
    errMsg = errMsg[0];
  } else {
    errMsg = null;
  }

  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: errMsg,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          "error",
          "Email already exists in the database, please choose a different one"
        );
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });

          return user.save();
        })
        .then((result) => {
          transporter.sendMail(
            {
              to: email,
              from: "shop@node-complete.com",
              subject: "Signup Succeeded!",
              text: "The signup proccess was successfull",
              html: "<h1> The signup proccess was successfull </h1>",
            },
            (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log("Message sent: %s", info.messageId);
              res.redirect("/login");
            }
          );
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getReset = (req, res, next) => {
  let errMsg = req.flash("error");

  if (errMsg.length > 0) {
    errMsg = errMsg[0];
  } else {
    errMsg = null;
  }

  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: errMsg,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with that email found.");
          return res.redirect("/reset");
        } else {
          user.resetToken = token;
          user.resetTokenExpiration = Date.now() + 3600000;
          return user.save();
        }
      })
      .then((result) => {
        transporter.sendMail({
          to: req.body.email,
          from: "shop@node-complete.com",
          subject: "Password reset",
          text: "The password reset proccess was successfully",
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
          `,
        });
      })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
