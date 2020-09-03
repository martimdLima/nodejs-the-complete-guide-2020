const path = require("path");
const rootDir = require("../utils/path");

const express = require("express");

const router = express.Router();

const adminData = require("./add-user");

router.get("/", (req, res, next) => {
  const userList = adminData.userList;
  res.render("users", {
    users: userList,
    pageTitle: "Users",
    path: "/",
    hasUsers: userList.length > 0,
    activeShop: true,
    usersCSS: true,
  });
});

module.exports = router;
