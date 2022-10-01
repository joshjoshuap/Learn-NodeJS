const ProductModel = require("../models/product");
const getDb = require("../util/database").getDb;

// Get: Display Product List
exports.getProducts = (req, res, next) => {
  ProductModel.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        path: "/admin/products",
        pageTitle: "Admin",
        prods: products,
      });
    })
    .catch((err) => console.log(err));
};

// Get: Display Add Product Form
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

// Post: Adding Product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title; // getting value from form
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new ProductModel(title, price, description, imageUrl);
  product
    .save()
    .then(() => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get: Display Edit Product Form
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  ProductModel.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Post: Editing Product
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const product = new ProductModel(
    updatedTitle,
    updatedPrice,
    updatedImageUrl,
    updatedDesc,
    prodId
  );

  product
    .save()
    .then(() => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

// Post: Delete Product
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.deleteById(prodId)
    .then(() => {
      console.log("Deleted Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
