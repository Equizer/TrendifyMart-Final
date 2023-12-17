const mongoose = require('mongoose')
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
});

const ProductSchema = new Schema({
  userId: {
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
  rating: {
    type: RatingSchema,
    required: true
  },
  priceCents: {
    type: Number,
    required: true
  },
  keywords: {
    type: Array,
    required: true
  },
  dateProductAdded: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;


/* 
this is a sample of the body for adding a product
{
  "imageUrl": "sampleurl",
  "name": "Nike Cleats",
  rating: {
    stars: 4,
    count: 364
  },
  priceCents: 1095,
  keywords: ["nike cleats", "boots"]
} */ 