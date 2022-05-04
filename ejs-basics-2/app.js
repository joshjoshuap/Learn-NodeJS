const express = require("express");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true })); // for parsing
app.use(express.static("public")); // to access public folder
app.set("view engine", "ejs"); // to access views and ejs
app.set("views", path.join(__dirname, "/views")); // to run access app.js from other directory

let gettingAge;
let group;

app.get("/", (req, res) => {
  res.render("index", { UserAge: gettingAge, AgeGroup: group }); // Sending response data to views/index.ejs
});

app.post("/", (req, res) => {
  gettingAge = req.body.userAge; // getting request data from views/index.ejs

  if (gettingAge < 2) {
    group = "Baby";
  } else if (gettingAge < 16) {
    group = "Children";
  } else if (gettingAge < 30) {
    group = "Young Adult";
  } else if (gettingAge < 45) {
    group = "Middle Adult";
  } else if (gettingAge > 45) {
    group = "Old Adult";
  }
  res.redirect("/"); // redirecting to app.get('/')
});

app.listen(3000, () => {
  console.log("Server is Running in  port 3000");
});
