const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const placeRoute = require("./routes/places-route");

app.use(express.urlencoded({ extended: true })); // for parsing data
app.use(express.static("public")); // accessing public folders
app.use(express.json());

app.use("/api/places", placeRoute); // /api/places/..

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500); // error handling
  res.json({ message: error.message || "An unkown error occured" });
});

app.listen(5000, () => {
  console.log("Server Running");
});
