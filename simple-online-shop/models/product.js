const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining schema
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: { 
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // user model
    require: true,
  },
});

// exporting collection product
module.exports = mongoose.model("Product", productSchema);
