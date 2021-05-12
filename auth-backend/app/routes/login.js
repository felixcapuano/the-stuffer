const bcrypt = require('bcryptjs');

const validation = require('../validation');
const { User, Token } = require('../mongo/model');
const { generateAccessToken, generateRefreshToken } = require('../utils');
const { isRefreshTokenExist } = require('../mongo/core');

module.exports = async (req, res) => {
  const isExist = await isRefreshTokenExist(req.cookies.jid);
  if (isExist)
    return await res.send({ ok: false, message: 'You already login' });

  const valid = validation.login(req.body);
  if (!valid)
    return res.send({
      ok: false,
      message: 'Bad format',
      errors: validation.login.errors,
    });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.send({ ok: false, message: 'Email or password is wrong' });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return await res.send({ ok: false, message: 'Email or password is wrong' });

  // save the refreshtoken
  const refreshToken = generateRefreshToken({ id: user._id });
  const token = new Token({ token: refreshToken });

  try {
    await token.save();
  } catch (err) {
    return await res.send({ ok: false, message: 'Internal error' });
  }

  return await res.cookie('jid', refreshToken, { httpOnly: true }).send({
    ok: true,
    message: 'Success',
    accessToken: generateAccessToken({ id: user._id, role: user.role }),
  });
};
