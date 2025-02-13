const mongoose = require("mongoose");

const connection = async () => {
  await mongoose.connect("mongodb://localhost:27017/Movie");
  console.log("Connected to Database");
};
module.exports = connection;