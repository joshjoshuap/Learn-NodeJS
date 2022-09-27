const ProductModel = require("../models/product");

// Get: render shop.ejs
exports.getProducts = (req, res) => {
  ProductModel.get((products) => {
    res.render("shop", {
      path: "/",
      pageTitle: "Shop",
      prods: products,
      hasProducts: products.length > 0,
      productCSS: true,
      activeProduct: true,
    });
  }); // getting data
};

// Get: render add-product.ejs
exports.getAddProduct = (req, res) => {
  res.render("add-product", {
    path: "/admin/add-product",
    pageTitle: "Add Product",
    formCSS: true,
    productCSS: true,
    activeProduct: true,
  });
};

// Post: adding product, add-product.ejs form
exports.postAddProduct = (req, res) => {
  const product = new ProductModel(req.body.title);
  product.save(); // saving data
  res.redirect("/");
};
