const ProductModel = require("../models/product");
const CartModel = require("../models/cart");

// Get: Display Homepage
exports.getIndex = (req, res, next) => {
  // display list
  ProductModel.findAll()
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
  ProductModel.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        path: "/products",
        pageTitle: "All Products",
        prods: products,
      });
    })
    .catch((err) => console.log(err));
};

// Get: Display Product Detail
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // find specific product
  ProductModel.findByPk(prodId)
    .then((products) => {
      res.render("shop/product-detail", {
        product: products[0],
        pageTitle: products[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
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
