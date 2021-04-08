const jwt = require('jsonwebtoken');

const validation = require('../validation');
const { Token, User } = require('../mongo/model');
const { generateAccessToken } = require('../utils');


module.exports = async (req, res) => {
  const badRequest = { ok: false, message: '', accessToken: ''}

  const refreshToken = req.cookies.jid;
  if (!refreshToken) return res.send(badRequest);

  const tokenExist = await Token.findOne({ token: refreshToken });
  if (!tokenExist) return res.send(badRequest);

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

    const user = await User.findOne({ _id: payload.id });
    console.log(user)
    if (!user) return res.send(badRequest);

    const accessToken = generateAccessToken({ _id: payload.id });
    return res.send({ ok: true, message: '', accessToken: accessToken });

  } catch (error) {
    console.error(error)
    return res.send(badRequest);
  }

}
