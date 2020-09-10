/* const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}); */

const { getDb } = require("../util/database");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectID;

const db = require("../util/database").getDb;

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
    //this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({_id: new ObjectId(userId)});
  }



}

module.exports = User;
