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
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },

    actualCheckIn: { type: Date, default: null }, // when the user actually checked in
    actualCheckOut: { type: Date, default: null }, // when the user actually checked out
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
