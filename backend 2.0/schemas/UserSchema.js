const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'owner'], // Restrict role to specific values
      required: true,
    },
    phone: {
      type: String,
      length: 10,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

module.exports = mongoose.model('User', UserSchema);
