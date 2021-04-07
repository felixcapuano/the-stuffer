const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validation = require('../validation');
const { User, Token} = require('../mongo/model');
const { generateAccessToken, generateRefreshToken } = require('../utils');


module.exports = async (req, res) => {
  const valid = validation.login(req.body);
  if (!valid) return res.status(400).send({ ok: false, message: 'Bad format', errors: validation.login.errors})

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ok: false, message: 'Email or password is wrong'})

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ok: false, message: 'Email or password is wrong' })

  const userObject = { _id: user._id };

  // save the refreshtoken
  const refreshToken = generateRefreshToken(userObject);
  const token = new Token({ token: refreshToken });

  try {
    const savedToken = await token.save();
  } catch (err) {
    return res.status(500).send({ok: false, message: 'Internal error'});
  }

  return res.status(201).cookie('jid', refreshToken, { httpOnly: true }).send({
    ok: true,
    message: '',
    accessToken: generateAccessToken(userObject),
  });
};