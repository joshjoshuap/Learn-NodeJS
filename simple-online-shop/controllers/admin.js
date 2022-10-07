const ProductModel = require("../models/product");
const fileHelper = require("../util/file");

// Get: Display Product List
exports.getProducts = (req, res, next) => {
  ProductModel.find({ userId: req.user._id })
    .then((products) => {
      res.render("admin/products", {
        path: "/admin/products",
        pageTitle: "Admin",
        prods: products,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Get: Display Add Product Form
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    hasError: false,
    errorMessage: null,
  });
};

// Post: Adding Product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title; // getting value from form
  const image = req.file; // get image file
  const price = req.body.price;
  const description = req.body.description;

  // check if image file is not image
  if (!image) {
    return res.status(422).render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        price: price,
        description: description,
      },
      errorMessage: "Attached file is not an image.",
    });
  }

  const imageFile = image.path; // getting image file

  const product = new ProductModel({
    title: title,
    imageUrl: imageFile,
    price: price,
    description: description,
    userId: req.user, // adding user
  });
  product
    .save()
    .then(() => {
      console.log("Creating Product Successful");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("Creating Product Failed\n", err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
        errorMessage: null,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Post: Editing Product
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImage = req.file;
  const updatedDesc = req.body.description;

  // find product id & update
  ProductModel.findById(prodId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      if (updatedImage) {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = updatedImage.path;
      }
      product.description = updatedDesc;
      return product.save().then(() => {
        console.log("Update Product Successful");
        res.redirect("/admin/products");
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Post: Delete Product
exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  ProductModel.findById(prodId)
    .then((product) => {
      if (!product) {
        return next(new Error("Product not Found"));
      }
      fileHelper.deleteFile(product.imageUrl);
      return ProductModel.deleteOne({ _id: prodId, userId: req.user._id });
    })
    .then(() => {
      console.log("Delete Product Successful");
      res.status(200).json({ message: "Success" });
    })
    .catch((err) => {
      console.log("Delete Product Failed");
      res.status(500).json({ message: "Deleteing Product Failed" });
    });
};
