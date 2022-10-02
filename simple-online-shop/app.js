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
const UserModel = require("./models/user");

// Contoller
const errorController = require("./controllers/error");

// Routes
const shopRoute = require("./routes/shop");
const adminRoutes = require("./routes/admin");

// Response, Request
app.use((req, res, next) => {
  UserModel.findById("63394477216d2e8ba809bfe0")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(shopRoute); // routes/shop.js
app.use("/admin", adminRoutes); // routes/admin.js
app.use(errorController.get404); // 404.ejs

mongoose
  .connect(
    "mongodb+srv://joshjoshuap1:gdr4uoirbZRbVqI0@cluster1.paalvk5.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    UserModel.findOne().then((user) => {
      if (!user) {
        const user = new UserModel({
          name: "josh",
          email: "josh@gmail.com",
          cart: {
            item: [],
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
