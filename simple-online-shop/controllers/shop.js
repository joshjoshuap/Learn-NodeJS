const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const ProductModel = require("../models/product");
const OrderModel = require("../models/order");

const ITEMS_PER_PAGE = 2;

// Get: Display Homepage
exports.getIndex = (req, res, next) => {
  // display list
  const page = +req.query.page || 1;
  let totalItems;
  ProductModel.find()
    .countDocuments()
    .then((numProducts) => {
      totalItems = numProducts;
      // pagination
      return ProductModel.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      res.render("shop/index", {
        path: "/",
        pageTitle: "Shop",
        prods: products,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Get: Display Product Page
exports.getProducts = (req, res, next) => {
  // display list
  const page = +req.query.page || 1;
  let totalItems;
  ProductModel.find()
    .countDocuments()
    .then((numProducts) => {
      totalItems = numProducts;
      // pagination
      return ProductModel.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      res.render("shop/product-list", {
        path: "/products",
        pageTitle: "All Products",
        prods: products,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Get: Display Product Detail
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; // getting product id in form
  // find specific product
  ProductModel.findById(prodId)
    .then((products) => {
      res.render("shop/product-detail", {
        product: products,
        pageTitle: products.title,
        path: "/products",
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Get: Display Cart List
exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Post: Adding to Cart
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  ProductModel.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log("Cart Added");
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Post: Deleting Cart Items
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Get: Display Order Page
exports.getOrders = (req, res, next) => {
  OrderModel.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// POST: Adding Order
exports.postOrder = (req, res) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new OrderModel({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });
      order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Get: Display Invoice
exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  // check user authentication & autorization
  OrderModel.findById(orderId)
    .then((order) => {
      if (!order) {
        console.log("No order Found");
        return next(new Error(err));
      }

      if (order.user.userId.toString() !== req.user._id.toString()) {
        console.log("Order Unuthorized");
        return next(new Error(err));
      }

      const invoiceName = "invoices-" + orderId + ".pdf";
      const invoicePath = path.join("data", "invoices", invoiceName);

      const pdfDoc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="' + invoiceName + '"'
      );
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);
      let totalPrice = 0;
      pdfDoc.fontSize(26).text("Order Invoice", {
        underline: true,
      });
      pdfDoc.text("------------------------");
      order.products.forEach((prod) => {
        totalPrice += prod.quantity * prod.product.price;
        pdfDoc
          .fontSize(16)
          .text(
            prod.product.title + "-" + prod.quantity + " $" + prod.product.price
          );
      });
      pdfDoc.text("Total Price:" + totalPrice);

      pdfDoc.end();
    })
    .catch((err) => next(err));
};

// Get: Display Checkout Page
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
