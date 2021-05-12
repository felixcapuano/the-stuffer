const jwt = require('jsonwebtoken');

const { Token, User } = require('../mongo/model');
const { generateAccessToken } = require('../utils');

module.exports = async (req, res) => {
  const badRequest = { ok: false, message: '', accessToken: '' };

  const refreshToken = req.cookies.jid;
  if (!refreshToken) return await res.send(badRequest);

  const tokenExist = await Token.findOne({ token: refreshToken });
  if (!tokenExist) return await res.send(badRequest);

  try {
    const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

    const user = await User.findOne({ _id: id });
    if (!user) return await res.send(badRequest);

    const _accessToken = generateAccessToken({ id, role: user.role });
    return await res.send({ ok: true, message: '', accessToken: _accessToken });
  } catch (error) {
    console.error(error);
    return await res.send(badRequest);
  }
};
