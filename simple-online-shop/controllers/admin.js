const ProductModel = require("../models/product");

// Get: render admin/products.ejs
exports.getProduct = (req, res) => {
  ProductModel.get((products) => {
    res.render("admin/products", {
      path: "/admin/products",
      pageTitle: "Admin Product",
      prods: products,
    });
  });
};

// Get: render admin/add-product.ejs
exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    path: "/admin/add-product",
    pageTitle: "Add Product",
  });
};

// Post: adding product, admin/add-product.ejs form
exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new ProductModel(title, imageUrl, price, description);
  product.save(); // saving data
  res.redirect("/");
};
