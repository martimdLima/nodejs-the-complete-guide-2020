exports.getLogin = (req, res, next) => {

    const isLoggedIn = req.get("Cookie").trim().split("=")[1];

    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login Page",
      isAuthenticated: isLoggedIn,
    });
};

exports.postLogin = (req, res, next) => {
  //req.isLoggedIn = true;

  res.setHeader("Set-Cookie", "loggedIn=true");

  res.redirect("/");
};
