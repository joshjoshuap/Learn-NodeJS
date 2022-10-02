const ProductModel = require("../models/product");

// Get: Display Product List
exports.getProducts = (req, res, next) => {
  ProductModel.find()
    // .select("title price")
    // .populate("userId", "name")
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
  const product = new ProductModel({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
    userId: req.user._id, // adding
  });
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Creating Product Successful");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("Creating Product Failed", err);
    });
};

// Get: Display Edit Product Form
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // check if query edit=true
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId; // get productid
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

  // find product id & update
  ProductModel.findById(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    })
    .then(() => {
      console.log("Update Product Successful");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log("Update Product Failed", err));
};

// Post: Delete Product
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.findByIdAndRemove(prodId)
    .then(() => {
      console.log("Delete Product Successful");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log("Delete Product Failed", err));
};
