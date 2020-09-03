const path = require("path");
const rootDir = require("../utils/path");

const express = require("express");

const router = express.Router();

const userList = [];

// /add-user => GET
router.get("/add-user", (req, res, next) => {
  res.render("add-user", {
    pageTitle: "Add a User",
    path: "/add-user",
    formsCSS: true,
    usersCSS: true,
    activeAddUser: true,
  });
});

// /add-user => POST
router.post("/add-user", (req, res, next) => {
  userList.push({ name: req.body.name });
  res.redirect("/");
});

exports.routes = router;
exports.userList = userList;
