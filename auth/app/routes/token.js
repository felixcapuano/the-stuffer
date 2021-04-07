const jwt = require('jsonwebtoken');

const validation = require('../validation');
const { Token, User } = require('../mongo/model');
const { generateAccessToken } = require('../utils');


module.exports = async (req, res) => {
  const refreshToken = req.cookies.jid;
  if (!refreshToken) return res.status(401).send({ok: false, message: ''});

  const tokenExist = await Token.findOne({ token: refreshToken });
  if (!tokenExist) return res.status(403).send({ok: false, message: ''});

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
  } catch (error) {
    return res.status(403).send({ok: false, message: ''});
  }

  const user = await User.findOne({ _id: payload._id});
  if (!user) return res.status(403).send({ok: false, message: ''});

  const accessToken = generateAccessToken({ _id: payload._id });
  return res.json({ok: true, message: '', accessToken: accessToken });
}
