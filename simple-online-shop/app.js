const express = require("express");
const bodyParder = require("body-parser");
const path = require("path");

const shopRoute = require("./routes/shop"); // shop.js
const adminRoute = require("./routes/admin"); // admin.js

const app = express();

app.set("view engine", "ejs"); // ejs template engine
app.set("views", "views"); // views folder to render ejs file

app.use(bodyParder.urlencoded({ extended: true })); // get data from the body of the form or post request
app.use(express.static(path.join(__dirname, "public"))); // to serve static files in public folder
app.use(shopRoute); // routes/shop.js
app.use("/admin", adminRoute.routes); // routes/admin.js
 // Undefined Route 404
app.use((req, res) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { docTitle: "404" }); // set status to 404, render 404.ejs
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
