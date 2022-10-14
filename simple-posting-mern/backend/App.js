require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placeRoute = require("./routes/places-route");
const userRoute = require("./routes/users-route");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // cors access
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/places", placeRoute); // /api/places/..
app.use("/api/users", userRoute); // /api/user/..

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

// Database COnnection, Server Running
mongoose
  .connect(process.env.MONGO_ATLAS_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server Running");
    });
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Connection Failed\n", err);
  });
