const express = require("express");

const router = express.Router();

const productController = require("../controllers/product");

// Get: /
router.get("/", productController.getProducts);

module.exports = router;
