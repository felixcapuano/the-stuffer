const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  email: String,
  username: String,
  password: String,
  role: { type: String, default: 'user' },
});

const tokenSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  token: String,
});

exports.User = mongoose.model('User', userSchema);
exports.Token = mongoose.model('Token', tokenSchema);
