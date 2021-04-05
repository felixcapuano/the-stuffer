const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  email: String,
  username: String,
  password: String,
});

exports.User = mongoose.model('User', userSchema);