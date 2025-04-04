const mongoose = require('mongoose');


const extraSubProductsSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  subProductid:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SubProduct',
  },
  extraSubProducts: [{
    type: String,
    required: true,
  }]
})

const ExtraSubProductsModel = mongoose.model('ExtraSubProduct', extraSubProductsSchema);

module.exports = ExtraSubProductsModel;