const express = require("express");
const bodyParder = require("body-parser");
const path = require("path");

const app = express();

const mongoConnect = require("./util/database").mongoConnect; // mongodb database connection

// Configure
app.set("view engine", "ejs"); // ejs template engine
app.set("views", "views"); // views folder to render ejs file
app.use(bodyParder.urlencoded({ extended: true })); // get data form or post request
app.use(express.static(path.join(__dirname, "public"))); // serve static files in public folder

// Contoller
const errorController = require("./controllers/error");

// Routes
const shopRoute = require("./routes/shop");
const adminRoutes = require("./routes/admin");

// Response, Request
app.use((req, res, next) => {
  next();
});
app.use(shopRoute); // routes/shop.js
app.use("/admin", adminRoutes); // routes/admin.js
app.use(errorController.get404); // 404.ejs

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Server running");
  });
});
