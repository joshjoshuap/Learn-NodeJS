const express = require("express");

const router = express.Router();
const adminData = require("./admin");

router.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html")); // __dirname is the current directory, ../ up one folder, views is folder, shop.html is file (root/views/shop.html)

  const products = adminData.products; // accessing product in admin
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    formCSS: true,
    productCSS: true,
    activeProduct: true,
  }); // passing objects response data to shop.ejs
});

module.exports = router;
