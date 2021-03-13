const path = require("path");

const express = require("express");

const routes = require("./routes/index");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.use((req, res, nex) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);
