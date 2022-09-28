const express = require("express");
// const path = require("path");

const router = express.Router(); // to reuse routing to another server file

const adminController = require("../controllers/admin");

// Get: Display Product List
router.get("/products", adminController.getProduct);

// Get: Display Add Product Form
router.get("/add-product", adminController.getAddProduct);

// Post: Add Product
router.post("/add-product", adminController.postAddProduct);

// Get: Display Edit Product Form
router.get("/edit-product/:productId", adminController.getEditProduct);

module.exports = router;
