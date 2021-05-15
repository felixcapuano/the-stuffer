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

    user.password = undefined;
    const _accessToken = generateAccessToken(user.toObject());
    user.email = undefined;
    user.date = undefined;
    user.__v = undefined;
    return await res.send({
      ok: true,
      message: '',
      accessToken: _accessToken,
      user: user.toObject(),
    });
  } catch (error) {
    console.error(error);
    return await res.send(badRequest);
  }
};
