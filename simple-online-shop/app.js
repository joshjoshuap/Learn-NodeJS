const express = require("express");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const csrf = require("csurf");
const flash = require("connect-flash");

// Database Connection String
const MongoDB_URI =
  "mongodb+srv://joshjoshuap1:gdr4uoirbZRbVqI0@cluster1.paalvk5.mongodb.net/shop";

// Intialize
const app = express();
const store = new mongoDbStore({
  uri: MongoDB_URI,
  collection: "sessions",
}); // add session in mongodb
const csrfProtection = csrf(); // csrf protection

// Model
const UserModel = require("./models/user");

// Contoller
const errorController = require("./controllers/error");

// Routes
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// Configure
app.set("view engine", "ejs"); // ejs template engine
app.set("views", "views"); // render views ejs file
app.use(bodyParser.urlencoded({ extended: true })); // form value, post request
app.use(express.static(path.join(__dirname, "public"))); // static files public folder
app.use(
  session({
    secret: "samplesecret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
); // intialize session authentication

app.use(csrfProtection); // enable csrf protection
app.use(flash());

// User Session Authentication
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

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(shopRoutes); // routes/shop.js
app.use(authRoutes); // routes/auth.js
app.use("/admin", adminRoutes); // routes/admin.js
app.use(errorController.get404); // 404.ejs

// Database Connection, Server
mongoose
  .connect(MongoDB_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running");
    });
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Connection Failed ", err);
  });
