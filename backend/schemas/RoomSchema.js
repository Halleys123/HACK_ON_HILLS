const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
      unique: true, // unique room number in the hotel
    },
    title: {
      type: String,
      default: '2 Double Beds, 1 King Bed',
    },
    description: {
      type: String,
      default:
        'This is a good room that is located in your hotel. It has all the basic amenities and is very comfortable.',
    },
    type: {
      type: String,
      enum: ['single', 'double', 'suite'],
      default: 'single',
    }, // 'single', 'double', 'suite'
    pricePerNight: {
      type: Number,
      required: true,
    },
    maxAdults: {
      type: Number,
      default: 2,
    },
    maxChildren: {
      type: Number,
      default: 2,
    },
    rating: { type: Number, max: 5, min: 1, default: 5 }, // avg rating
    isAvailable: {
      type: Boolean,
      default: true,
    },
    images: [String],
    amenities: [String], // room-specific
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Room', RoomSchema);
