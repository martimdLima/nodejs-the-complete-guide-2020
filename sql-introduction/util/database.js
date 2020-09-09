// import mariadb
const mariadb = require("mariadb");

// create connection pool
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  connectionLimit: 5,
});

const connection = pool
  .getConnection()
  .then((conn) => {
    console.log("connected ! connection id is " + conn.threadId);
    return conn;
  })
  .catch((err) => {
    console.log("not connected due to error: " + err);
  });

(module.exports = pool), connection;
