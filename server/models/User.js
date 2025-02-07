const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\d{10}$/;
        return emailRegex.test(v) || phoneRegex.test(v);
      },
      message: 'Username must be either a valid email or phone number.'
    }
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  },
});

module.exports = mongoose.model('User', UserSchema);
