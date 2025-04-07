const mongoose = require('mongoose');

const HotelSchema = mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    }, // reference to User
    hotelName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      requried: true,
      default: 'This is a good hotel that is located in your city',
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    images: [String], // image URLs
    rating: { type: Number, max: 5, min: 1, default: 5 }, // avg rating
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Hotels', HotelSchema);
