const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  foodPartnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodPartner',
    required: true,
  },
});

const FoodItemModel = mongoose.model('FoodItem', foodItemSchema);
module.exports = FoodItemModel;