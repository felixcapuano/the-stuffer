const { Token } = require('../mongo/model');
const validation = require('../validation');

module.exports = async (req, res) => {
  const valid = validation.token(req.body);
  if (!valid) return res.sendStatus(401);

  const tokenDeleted = await Token.deleteOne({ token: req.body.token });
  if(tokenDeleted.n === 0) return res.sendStatus(404);
  res.sendStatus(204);
}
