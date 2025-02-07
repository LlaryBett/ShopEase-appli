const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  wasPrice: { type: String, required: true },
  isPrice: { type: String, required: true },
  image: { type: String, required: true },
  additionalImages: [String],
  stock: { type: Number, required: true },
  reviews: [
    {
      text: { type: String },
      rating: { type: Number, min: 1, max: 5 }
    }
  ],
  rating: { type: Number, default: 0 },
  section: {
    type: String,
    enum: [
      "Top Sellers",
      "Featured Products",
      "Most Popular Deals",
      "Deals of the Week",
      "Top Deals",
      "Refresh Your Day"
    ],
    required: true
  }
});

module.exports = mongoose.model('Product', ProductSchema);
