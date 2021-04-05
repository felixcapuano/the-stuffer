const jwt = require('jsonwebtoken');

const validation = require('../validation');
const { Token } = require('../mongo/model');
const { generateAccessToken } = require('../utils');


module.exports = async (req, res) => {
  const valid = validation.token(req.body);
  if (!valid) return res.sendStatus(401);

  const refreshToken = req.body.token;

  const tokenExist = await Token.findOne({ token: refreshToken });
  if(!tokenExist) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if(err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ _id: user._id });
    res.json({accessToken: accessToken});
  })
}
