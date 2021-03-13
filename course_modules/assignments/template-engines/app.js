const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminData = require("./routes/add-user");
const shopRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", adminData.routes);
app.use(shopRoutes);

app.use((req, res, nex) => {
  res.render("404", { pageTitle: "404 - Page Not Found", path: false });
});

app.listen(3000);
