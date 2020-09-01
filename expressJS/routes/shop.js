const path = require("path");
const rootDir = require("../utils/path");

const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  //   res.send("<h1>Hello from Express!</h1>");
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
