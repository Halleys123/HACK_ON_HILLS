const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
  {
    _id: ObjectId,
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      max: 5,
      min: 1,
      default: 1,
    },
    comment: String,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Reviews', ReviewSchema);
