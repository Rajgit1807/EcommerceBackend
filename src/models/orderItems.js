const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
});
const OrderItemModel= mongoose.model('orderItems', OrderItemSchema);
module.exports= OrderItemModel;
 
