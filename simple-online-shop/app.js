const express = require("express");
const bodyParder = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Configure
app.set("view engine", "ejs"); // ejs template engine
app.set("views", "views"); // views folder to render ejs file
app.use(bodyParder.urlencoded({ extended: true })); // get data form or post request
app.use(express.static(path.join(__dirname, "public"))); // serve static files in public folder

// Model
// const UserModel = require("./models/user");

// Contoller
const errorController = require("./controllers/error");

// Routes
const shopRoute = require("./routes/shop");
const adminRoutes = require("./routes/admin");

// Response, Request
// app.use((req, res, next) => {
//   UserModel.findById("6338140a906327771d77ea12")
//     .then((user) => {
//       req.user = new UserModel(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
app.use(shopRoute); // routes/shop.js
app.use("/admin", adminRoutes); // routes/admin.js
app.use(errorController.get404); // 404.ejs

mongoose
  .connect(
    "mongodb+srv://joshjoshuap1:gdr4uoirbZRbVqI0@cluster1.paalvk5.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server running");
    });
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Connection Failed", err);
  });
