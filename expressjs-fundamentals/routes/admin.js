const express = require("express");
// const path = require("path");

const router = express.Router(); // to reuse routing to another server file

const products = [];

// Get
router.get("/add-product", (req, res) => {
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html")); // rendering html files

  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeProduct: true,
  }); // passing object response to add-product.ejs
});

// POST
router.post("/add-product", (req, res) => {
  products.push({ title: req.body.title });
  console.log(req.body); // get data value from the form in router/get("/add-product")
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
