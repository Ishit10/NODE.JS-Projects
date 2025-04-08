const mongoose = require("mongoose");

const connected = async function () {
  await mongoose.connect(process.env.MONGO_DB);
  // await mongoose.connect('mongodb://localhost:27017/admin');
  console.log("Connected to MongoDB");
};

module.exports = connected;