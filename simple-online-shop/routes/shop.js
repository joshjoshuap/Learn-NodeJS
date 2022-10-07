const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth"); // check user session

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart);

router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

// router.get("/checkout", isAuth, shopController.getCheck);

// router.get("/checkout/success", shopController.getCheckSuccess);

// router.get("/checkout/cancel", shopController.getCheck);

router.get("/orders", isAuth, shopController.getOrders);

router.get("/orders/:orderId", isAuth, shopController.getInvoice);

router.post("/create-order", isAuth, shopController.postOrder);

module.exports = router;
