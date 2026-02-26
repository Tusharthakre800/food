const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
    index: true,

  },
  password: {
    type: String,
    required: true,
  },
  addresses: [{
    label: { type: String, default: 'Home' }, // Home, Work, etc.
    detail: { type: String, required: true },
    isDefault: { type: String, default: 'no' } // yes, no
  }],
  profilePic: {
    type: String,
    default: '',
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});


const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
