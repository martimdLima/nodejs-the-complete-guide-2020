const path = require("path");
const rootDir = require("../utils/path");

const express = require("express");

const router = express.Router();

router.get("/users", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "users.html"));
});

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "index.html"));
});

module.exports = router;
