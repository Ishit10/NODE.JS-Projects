const mongoose = require("mongoose");

const connection = async () => {
  await mongoose.connect("mongodb://localhost:27017/Bookstore");
  console.log("Connected to Database");
};
module.exports = connection;