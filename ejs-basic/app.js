const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("index"); // views/index.ejs
});

app.get("/add", (req, res) => {
  const num1 = 2;
  const num2 = 2;
  const result = num1 + num2;
  res.render("addition", { addResult: result }); // views/addition.ejs
});

app.listen(3000, () => {
  console.log("Server is Running in  port 3000");
});
