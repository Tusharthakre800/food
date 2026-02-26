const mongoose = require('mongoose');

const orderListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  foodPartnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodPartner',
    required: true,
  },
  items: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  address: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const OrderList = mongoose.model('OrderList', orderListSchema);

module.exports = OrderList;