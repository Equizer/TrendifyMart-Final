const mongoose = require('mongoose');
const { Schema } = mongoose;

const RatingSchema = new Schema({
  stars: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
})

const CartItemSchema = new Schema({
  sellerId: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: RatingSchema,
    required: true
  },
  priceCents: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  keywords: {
    type: Array,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});
const CartItem = mongoose.model('cart items', CartItemSchema)
module.exports = CartItem