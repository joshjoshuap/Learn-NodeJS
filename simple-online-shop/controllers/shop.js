const ProductModel = require("../models/product");

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

// Get: cart.ejs
exports.getCart = (req, res) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
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
