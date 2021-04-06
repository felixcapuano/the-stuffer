const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validation = require('../validation');
const { User, Token} = require('../mongo/model');
const { generateAccessToken } = require('../utils');


module.exports = async (req, res) => {
  const valid = validation.login(req.body);
  if (!valid) return res.status(400).send(validation.login.errors)

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ message: 'Email or password is wrong'})

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send({ message: 'Email or password is wrong'})

  const userObject = { _id: user._id };
  const accessToken = generateAccessToken(userObject);
  const refreshToken = jwt.sign(userObject, process.env.ACCESS_TOKEN);

  const token = new Token({ token: refreshToken });
  try {
    const savedToken = await token.save();
    return res.status(201).send({
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  } catch(err) {
    return res.status(500).send(err);
  }
};