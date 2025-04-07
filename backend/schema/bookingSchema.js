const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  checkInDate: Date,
  checkOutDate: Date,
  status: {
    type: String,
    enum: ['booked', 'checked-in', 'checked-out'],
    default: 'booked',
  },
  checkInCode: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
