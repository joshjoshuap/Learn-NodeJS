const express = require("express");
const bodyParser = require("body-parser");

const feedRoute = require("./routes/feed");

const app = express();

app.use(bodyParser.json()); // parsing json data

app.use((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"),
    res.setHeader(
      "Access-Control-ALlow-Headers",
      "Content-Type, Authorization"
    );
}); // cors fix

app.use("/feed", feedRoute);

app.listen(3000, () => {
  console.log("Server Running");
});
