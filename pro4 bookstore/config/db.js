const mongoose = require("mongoose")

const connection = async () => {
    await mongoose.connect("mongodb://localhost:27017/Books")
    console.log("Connected to Server");
};
module.exports = connection;


