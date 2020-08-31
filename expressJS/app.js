import { createServer } from "http";
import { express } from "express";

const app = express();

app.use('/add-product', (req, res, next) => {
    console.log("In another Middleware!");
    res.send("<h1>The Add Product Page </h1>");
});

app.use('/', (req, res, next) => {
    console.log("In another Middleware!");
    res.send("<h1>Hello from Express.js</h1>");
});

const server = createServer(app);
server.listen(3000);
