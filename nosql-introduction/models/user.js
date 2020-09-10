const { getDb } = require("../util/database");
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

  addToCart(product) {
    const updatedCart = { items: [{ productId: new ObjectId(product._id), quantity: 1 }] };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );

      /*     const cartProduct = this.cart.items.findIndex(cartProd => {
      return cartProd._id === product._id
    }); */
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
