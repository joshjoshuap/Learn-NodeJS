const express = require("express");
const path = require("path");

const router = express.Router();
const adminData = require("./admin");

router.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html")); // __dirname is the current directory, ../ up one folder, views is folder, shop.html is file (root/views/shop.html)

  const products = adminData.products;
  res.render("shop", { prods: products, docTitle: "shops" });
});

module.exports = router;
