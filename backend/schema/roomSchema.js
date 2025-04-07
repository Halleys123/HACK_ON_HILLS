const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  roomNumber: String,
  type: String, // single, double, suite, etc.
  price: Number,
  isAvailable: { type: Boolean, default: true },
});

module.exports = mongoose.model('Room', roomSchema);
