const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Added: Removes leading/trailing whitespace
  },
  location: {
    type: String,
    required: true,
    trim: true // Added: Removes leading/trailing whitespace
  },
  website: {
    type: String,
    trim: true // Added: Removes leading/trailing whitespace
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true // Added: Removes leading/trailing whitespace
  },
  openHours: {
    type: String,
    trim: true // Added: Removes leading/trailing whitespace
  },
  priceRange: {
    type: String, // e.g., "$$ (11-30)"
    trim: true // Added: Removes leading/trailing whitespace
  },
  reservationsNeeded: {
    type: Boolean,
    default: false
  },
  isDeliveryAvailable: {
    type: Boolean,
    default: false
  },
  menuUrl: {
    type: String,
    required: true,
    trim: true // Added: Removes leading/trailing whitespace
  },
  reviews: [{ // Changed field name from 'review' (singular) to 'reviews' (plural) for consistency with arrays
    type: String,
    trim: true // Added: Removes leading/trailing whitespace
  }],
  photos: [{
    type: String,
    trim: true // Added: Removes leading/trailing whitespace
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  cuisine: [{
    type: String,
    enum: ['American', 'Italian', 'Chinese', 'Indian', 'Japanese', 'Mexican', 'Thai', 'French', 'Mediterranean', 'Greek', 'Spanish', 'Other'],
    
    trim: true 
  }],
}, {
  timestamps: true 
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
