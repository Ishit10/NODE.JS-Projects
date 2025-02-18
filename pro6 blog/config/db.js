const mongoose = require("mongoose");

const connection = async () => {
  await mongoose.connect("mongodb://127.0.0.1/Blog");
  console.log("Connected to Database");
};
module.exports = connection;
