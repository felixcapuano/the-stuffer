const { verify } = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) return res.send({ ok: false, message: 'Need to login' });

  try {
    const { id, role } = verify(accessToken, process.env.ACCESS_TOKEN);
    req.body._user = { id, role };
  } catch (error) {
    console.error(error);
    return res.send({ ok: false, message: 'Access denied' });
  }

  next();
};
