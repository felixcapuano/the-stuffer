const { verify } = require('jsonwebtoken');
const { User } = require('./mongo/model');

module.exports = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) return res.send({ ok: false, message: 'Need to login' });

  try {
    const userData = verify(accessToken, process.env.ACCESS_TOKEN);
    req.body._user = userData;
  } catch (error) {
    console.error(error);
    return await res.send({ ok: false, message: 'Access denied' });
  }

  next();
};
