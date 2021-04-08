const { verify } = require('jsonwebtoken');


exports.isAuth = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1]
  if (!accessToken) return res.send({ ok: false, message:'Access token required'})

  try {
    const payload = verify(accessToken, process.env.ACCESS_TOKEN);
    req.body._user = { id: payload.id, role: payload._role}
  } catch (error) {
    console.error(error)
    return res.send({ ok: false, message:'Access denied'})
  }

  next();
}