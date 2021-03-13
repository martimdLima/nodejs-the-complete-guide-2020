const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login Page",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5f5ad2ed27949d5bf02c878b")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;

      // normally there's no need to explicitly save the session,
      // but in cases there is the need to garanty that the user is logged in it can be used
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
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
