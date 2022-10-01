const ProductModel = require("../models/product");

// Get: Display Homepage
exports.getIndex = (req, res, next) => {
  // display list
  ProductModel.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        path: "/",
        pageTitle: "Shop",
        prods: products,
      });
    })
    .catch((err) => console.log(err));
};

// Get: Display Product Page
exports.getProducts = (req, res, next) => {
  ProductModel.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        path: "/products",
        prods: products,
        pageTitle: "All Products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get: Display Product Detail
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // find specific product
  ProductModel.findById(prodId)
    .then((products) => {
      res.render("shop/product-detail", {
        product: products,
        pageTitle: products.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

// Get: Display Order Page
exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

// POST: Adding Order
exports.postOrder = (req, res) => {
  req.user
    .addOrder()
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

// Get: Display Checkout Page
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

// Get: Display Cart List
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

// Post: Adding to Cart
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Post: Deleting Cart Items
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};
