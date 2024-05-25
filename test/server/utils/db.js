const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://immarchz:MM100345MM@mesa.70knyk1.mongodb.net/"
    );
    console.log("DB Connected");
  } catch (err) {
    console.log("err", err);
  }
};

module.exports = connectDB;
