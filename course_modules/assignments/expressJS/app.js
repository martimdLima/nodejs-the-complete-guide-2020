const http = require("http");
const express = require("express");

const app = express();

/* app.use((req, res, next) => {
    console.log("In first the Middleware!");
    res.next()
});

app.use((req, res, next) => {
    console.log("In second the Middleware!");
    res.send("<h1> Express.js Assignment </h1>");
}); */


app.use('/users', (req, res, next) => {
    console.log("In first the Middleware!");
    res.send("<h1>The Users Page </h1>");
});

app.use('/', (req, res, next) => {
    console.log("In the second Middleware!");
    res.send("<h1>Home Page</h1>");
});

const server = http.createServer(app);
server.listen(3000);
