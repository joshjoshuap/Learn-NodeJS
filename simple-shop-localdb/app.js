const express = require("express");
const bodyParder = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs"); // ejs template engine
app.set("views", "views"); // views folder to render ejs file

app.use(bodyParder.urlencoded({ extended: true })); // get data form or post request
app.use(express.static(path.join(__dirname, "public"))); // serve static files in public folder

const errorController = require("./controllers/error");

const shopRoute = require("./routes/shop");
const adminRoutes = require("./routes/admin");

app.use(shopRoute); // routes/shop.js
app.use("/admin", adminRoutes); // routes/admin.js
app.use(errorController.get404); // 404.ejs

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
