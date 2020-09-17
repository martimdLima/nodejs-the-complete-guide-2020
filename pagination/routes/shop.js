const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

const shopController = require("../controllers/shop");

const { paginateItems } = require("../util/pagination");

router.get(
  "/",
  paginateItems("shop/index", "Shop", "/"),
  shopController.getIndex
);

router.get(
  "/products",
  paginateItems("shop/index", "Shop", "/"),
  shopController.getProducts
);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart);

router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

router.get("/orders", isAuth, shopController.getOrders);

router.post("/create-order", isAuth, shopController.postOrder);

router.get("/orders/:orderId", isAuth, shopController.getInvoice);

module.exports = router;
