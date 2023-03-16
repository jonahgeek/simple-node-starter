const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String
    },
    physical_address: {
      type: String
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN']
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('user', UserSchema);
