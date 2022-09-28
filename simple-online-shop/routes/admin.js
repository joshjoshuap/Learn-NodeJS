const express = require("express");
// const path = require("path");

const router = express.Router(); // to reuse routing to another server file

const adminController = require("../controllers/admin");

// Get: /admin/product
router.get("/products", adminController.getProduct);

// Get: /admin/add-product
router.get("/add-product", adminController.getAddProduct);

// Post: /admin/add-product
router.post("/add-product", adminController.postAddProduct);

module.exports = router;
