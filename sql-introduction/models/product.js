/* const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const Cart = require("../models/cart");

const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static fetchById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      callback(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
}; */

const Cart = require("../models/cart");
const connection = require("../util/database");

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  /*
  INSERT INTO node_complete.products (id, title, price, description, imageUrl) VALUES(?, ?, ?, ?, ?), []
  */

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
