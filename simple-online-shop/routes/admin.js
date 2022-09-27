const express = require("express");
// const path = require("path");

const router = express.Router(); // to reuse routing to another server file

const productController = require("../controllers/product");

// GET: /admin/add-product
router.get("/add-product", productController.getAddProduct);

// POST: /admin/add-product
router.post("/add-product", productController.postAddProduct);

module.exports = router;
