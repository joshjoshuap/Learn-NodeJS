const express = require("express");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");

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
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // image folder path upload
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // convert image binary to image type
  },
}); // set file upload storage
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}; // set filter image upload file type

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
app.use(bodyParser.urlencoded({ extended: true })); // get form value, post request
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
); // form image file upload
app.use(express.static(path.join(__dirname, "public"))); // static files public folder
app.use("/images", express.static(path.join(__dirname, "images"))); // static files images folder
app.use(
  session({
    secret: "samplesecret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
); // intialize session authentication

app.use(csrfProtection); // enable csrf protection
app.use(flash()); // flash display validation

// User Session Authentication
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  UserModel.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(shopRoutes); // routes/shop.js
app.use(authRoutes); // routes/auth.js
app.use("/admin", adminRoutes); // routes/admin.js
app.use("/500", errorController.get500); // 500.ejs
app.use(errorController.get404); // 404.ejs

app.use((error, req, res, next) => {
  console.log(error);
  res.redirect("/500");
}); // error handling

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
    console.log("Database Connection Failed\n", err);
  });
