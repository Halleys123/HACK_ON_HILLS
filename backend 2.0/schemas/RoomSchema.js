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
    type: {
      type: String,
      enum: ['single', 'double', 'suite'],
      default: 'single',
    }, // 'single', 'double', 'suite'
    pricePerNight: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    }, // how many people it fits
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

module.exports = mongoose.model('Rooms', RoomSchema);
