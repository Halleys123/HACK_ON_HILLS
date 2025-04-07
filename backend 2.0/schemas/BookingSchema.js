const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hotel',
      required: true,
    }, // for faster querying
    roomId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Room',
      required: true,
    },
    checkIn: Date,
    checkOut: Date,
    totalPrice: Number,
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    }, // 'confirmed', 'cancelled', 'completed'
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Bookings', BookingSchema);
