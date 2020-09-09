const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

// mongodb+srv://mdlima:Fp53UihfDIOC0o7a@cluster0.xmtoh.mongodb.net/cluster0?retryWrites=true&w=majority

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://mdlima:Fp53UihfDIOC0o7a@cluster0.xmtoh.mongodb.net/cluster0?retryWrites=true&w=majority"
  )
    .then(client => {
      console.log("Connected");
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = mongoConnect

/* const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://mdlima:<password>@cluster0.xmtoh.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */
