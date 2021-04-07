const { Token } = require('../mongo/model');
const validation = require('../validation');

module.exports = async (req, res) => {
  const refreshToken = req.cookies.jid;
  if (!refreshToken) return res.status(401).send({ok: false, message: 'Try to login.'})

  const tokenDeleted = await Token.deleteOne({ token: refreshToken });
  if(tokenDeleted.n === 0) return res.status(404).send({ok: false, message: 'Try to login'});
  res.status(204).send({ok: true, message:''});
}
