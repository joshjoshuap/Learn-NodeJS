const express = require("express");
const bodyParser = require("body-parser");

const placeRoute = require("./routes/places-route");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placeRoute); // /api/places/..

app.use((req, res, next) => {
  const error = new HttpError("Page not Found", 404);
  throw error;
}); // error 404 not found

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
