/* const Cart = require("../models/cart");
const connection = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save(prodTitle, prodPrice, prodDescription, prodImgUrl) {
    return connection.query(
      "INSERT INTO node_complete.products (title, price, description, imageUrl) VALUE (?, ?, ?, ?)",
      [prodTitle, prodPrice, prodDescription, prodImgUrl]
    );
  }

  static fetchAll() {
    return connection.query("SELECT * FROM node_complete.products;");
  }

  static fetchById(id) {
    return connection.query("SELECT * FROM node_complete.products WHERE products.id =?", [id])
  }

  static deleteById(id) {}
};
 */

 const Sequelize = require("sequelize");

 const sequelize = require("../util/database");

 const Product = sequelize.define("product", {
   id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     allowNull: false,
     primaryKey: true,
   },
   title: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   price: {
     type: Sequelize.DOUBLE,
     allowNull: false,
   },
   imageURl: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   description: {
    type: Sequelize.STRING,
    allowNull: false,
   }
 });

 module.exports = Product