const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "User",
  }, // relations place to user model
});

module.exports = mongoose.model("Place", placeSchema); // collection name
