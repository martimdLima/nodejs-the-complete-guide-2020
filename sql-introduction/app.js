const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const pool = require("./util/database");
const connection = require("./util/database");
//const mariadb = require('mariadb');

/* const connection = mariadb
.createConnection({
  host: "localhost",
  user: "root",
  password: "s0ns0fl1b3r7y@MySQLr007",
}); */



const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

/* connection
  .then((conn) => {
    //console.log(conn);
    conn.query("SELECT * FROM node_complete.products;")
        .then((res) => {
            for(var i = 0; i <= res.length -1; i++) {
                console.log(res[i])
            }
            conn.end();
            console.log("CONN CLOSED..");
        })
        .catch(err => {

        });
})
.catch((err) => {
    console.log(err);
}); */
    
/* pool.getConnection()
.then(conn => {
    console.log("connected ! connection id is " + conn.threadId);
    conn.query("SELECT * FROM node_complete.products;")
        // .then((res) => {
        //     for(var i = 0; i <= res.length -1; i++) {
        //         console.log(res[i])
        //     }
        //     conn.release(); //release to pool
        //     console.log("CONN CLOSED..");
        // })
        .then((res) => {
            const prods = res.filter(function(value, index, arr){ return value !== "meta";});
            console.log(prods);
        })
        .catch(err => {
            console.log(err);
        });

  })
  .catch(err => {
    console.log("not connected due to error: " + err);
  }); */

connection.query("SELECT * FROM node_complete.products;")
.then((res) => {
    const prods = res.filter(function(value, index, arr){ return value !== "meta";});
    //console.log(prods);
})
.catch(err => {
    console.log(err);
});

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { createPool } = require("mariadb");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
