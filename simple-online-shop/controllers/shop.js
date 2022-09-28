const ProductModel = require("../models/product");
const CartModel = require("../models/cart");

// Get: index.ejs
exports.getIndex = (req, res) => {
  ProductModel.get((products) => {
    res.render("shop/index", {
      path: "/",
      pageTitle: "Shop",
      prods: products,
    });
  });
};

// Get: product-list.ejs
exports.getProducts = (req, res, next) => {
  ProductModel.get((products) => {
    res.render("shop/product-list", {
      path: "/products",
      prods: products,
      pageTitle: "All Products",
    });
  });
};

// Get: product-list.ejs, getting params :id
exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  ProductModel.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      path: "/products",
      pageTitle: product.title,
      product: product,
    });
  });
};

// Get: cart.ejs
exports.getCart = (req, res) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

// Post: cart.ejs
exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId, (product) => {
    CartModel.addProduct(prodId, product.price);
  });
  res.redirect("/cart"); // router.get('/cart')
};

// Get: order.ejs
exports.getOrder = (req, res) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Order",
  });
};

// Get: checkout.ejs
exports.getCheckout = (req, res) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
