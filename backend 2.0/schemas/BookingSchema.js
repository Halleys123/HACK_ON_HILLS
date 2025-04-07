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
    actualCheckIn: Date,
    actualCheckOut: Date,
    totalPrice: Number,
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled', 'completed'],
      default: 'pending',
    }, // 'confirmed', 'cancelled', 'completed'
    validUntil: {
      type: Date,
      default: new Date(Date.now() + 15 * 60 * 1000),
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Bookings', BookingSchema);
