const ProductModel = require("../models/product");
const CartModel = require("../models/cart");

// Get: Display Homepage
exports.getIndex = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

// Get: Display Product Page
exports.getProducts = (req, res, next) => {
  ProductModel.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

// Get: Display Product Detail
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  ProductModel.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

// Get: Display Order Page
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
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
  CartModel.getCart((cart) => {
    ProductModel.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

// Post: Adding to Cart
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId, (product) => {
    CartModel.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

// Post: Deleting Cart Items
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId, (product) => {
    CartModel.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};
