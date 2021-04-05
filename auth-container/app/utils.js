const jwt = require('jsonwebtoken');

exports.generateAccessToken = (object) => {
  return jwt.sign(object, process.env.ACCESS_TOKEN, { expiresIn: '15s'});
}