const mongoose = require("mongoose");

const subProductSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  subProduct: {
    type: String,
    required: true,
  },
});

const SubProductModel = mongoose.model("SubProduct", subProductSchema);

module.exports = SubProductModel;