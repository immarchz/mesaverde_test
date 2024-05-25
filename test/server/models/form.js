const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  petName: String,
  petId: String,
  petAge: Number,
  petPic: String,
  name: String,
  phone: String,
  email: String,
  id: String,
  address: String,
});

module.exports = mongoose.model("Form", formSchema);
