const express = require("express");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const MongoDB_URI =
  "mongodb+srv://joshjoshuap1:gdr4uoirbZRbVqI0@cluster1.paalvk5.mongodb.net/shop";

const app = express();
const store = new mongoDbStore({
  uri: MongoDB_URI,
  collection: "sessions",
});

// Configure
app.set("view engine", "ejs"); // ejs template engine
app.set("views", "views"); // views folder to render ejs file
app.use(bodyParser.urlencoded({ extended: true })); // form data, post request
app.use(express.static(path.join(__dirname, "public"))); // static files public folder
app.use(
  session({
    secret: "samplesecret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
); // session authentication

// Model
const UserModel = require("./models/user");

// Contoller
const errorController = require("./controllers/error");

// Routes
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// Response, Request
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  UserModel.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(shopRoutes); // routes/shop.js
app.use(authRoutes); // routes/auth.js
app.use("/admin", adminRoutes); // routes/admin.js
app.use(errorController.get404); // 404.ejs

// Database Connection, Server
mongoose
  .connect(MongoDB_URI)
  .then((result) => {
    UserModel.findOne().then((user) => {
      if (!user) {
        const user = new UserModel({
          name: "josh",
          email: "josh@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000, () => {
      console.log("Server running");
    });
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Connection Failed ", err);
  });
