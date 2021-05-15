const { verify } = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) return res.send({ ok: false, message: 'Need to login' });

  try {
    const user = verify(accessToken, process.env.ACCESS_TOKEN);
    req.body._user = user;
  } catch (error) {
    console.error(error);
    return res.send({ ok: false, message: 'Access denied' });
  }

  next();
};
