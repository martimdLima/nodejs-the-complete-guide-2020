/* const { getDb } = require("../util/database");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectID;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((index) => {
      return index.productId;
    });

    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((prod) => {
          return {
            ...prod,
            quantity: this.cart.items.find((item) => {
              return item.productId.toString() === prod._id.toString();
            }).quantity,
          };
        });
      });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cartProd) => {
      return cartProd.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });

    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getDb();

    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.username,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = getDb();
    return db.collection("orders").find({'user._id': new ObjectId(this._id)}).toArray();
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        //console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
 */