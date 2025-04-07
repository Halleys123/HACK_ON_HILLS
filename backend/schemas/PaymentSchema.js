const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Booking',
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: Number,
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet', 'cash'],
  }, // 'card', 'upi', etc.
  status: {
    type: String,
    enum: ['success', 'failed'],
  }, // 'success', 'failed'
  transactionDate: Date,
});

module.exports = mongoose.model('Payments', PaymentSchema);
