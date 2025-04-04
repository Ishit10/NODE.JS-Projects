const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
    
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;