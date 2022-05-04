const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/add-product", (req, res) => {
  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));

  res.render("add-product", { docTitle: "Add Product" });
});

router.post("/add-product", (req, res) => {
  console.log(req.body); // get data value from the form in router/get("/add-product")
  res.redirect("/");
});

module.exports = router;
