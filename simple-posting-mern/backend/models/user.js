const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  image: { type: String, require: true },
  places: [
    {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Place",
    },
  ], // relations user to place model, one to many using []
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
