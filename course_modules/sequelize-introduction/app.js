const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Model Associations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  //.sync({force: true})
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "testUser",
        email: "test@test.com",
      });
    } else {
      //return Promise.resolve(user);
      return user;
    }
  })
  .then((user) => {
    ///////////////////////////////////
    // This code was added to prevent the creation of a new cart each time the application starts
    user
      .getCart()
      .then((cart) => {
        if (cart) {
          return cart;
        } else {
          return user.createCart();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    ///////////////////////////////////

    //return user.createCart();
  })
  .then((cart) => {
    console.log("IN CART THEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
