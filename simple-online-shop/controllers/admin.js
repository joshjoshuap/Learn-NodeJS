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

// Get: render admin/edit-product.ejs
exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    path: "/admin/add-product",
    pageTitle: "Add Product",
    editing: false,
  });
};

// Post: adding product, admin/edit-product.ejs form
exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new ProductModel(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

// Get: render admin/edit-product.ejs
exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  ProductModel.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      path: "/admin/edit-product",
      pageTitle: "Edit Product",
      editing: editMode,
      product: product,
    });
  });
};
