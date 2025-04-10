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
    contact: {
      phone: String,
      email: String,
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
    checkInStatus: {
      type: String,
      enum: ['checked-in', 'upcoming', 'checked-out'],
      default: 'notCheckedIn',
    },
    validUntil: {
      type: Date,
      default: new Date(Date.now() + 15 * 60 * 1000),
    },
    specialRequests: String,
    guests: {
      adults: { type: Number, default: 1 },
      children: { type: Number, default: 0 },
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Bookings', BookingSchema);
