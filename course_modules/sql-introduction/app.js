const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const connection = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

connection
  .query("SELECT * FROM node_complete.products;")
  .then((res) => {
    const prods = res.filter(function (value, index, arr) {
      return value !== "meta";
    });
  })
  .catch((err) => {
    console.log(err);
  });

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
