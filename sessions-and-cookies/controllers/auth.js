exports.getLogin = (req, res, next) => {
  //const isLoggedIn = req.get("Cookie").trim().split("=")[1] === true;

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login Page",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  //req.isLoggedIn = true;
  // Cookie properties - Expires | Max-Age | Domain | Secure
  res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");

  res.redirect("/");
};
