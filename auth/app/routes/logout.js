const { Token } = require('../mongo/model');
const validation = require('../validation');

module.exports = async (req, res) => {
  console.log(req.cookies)
  const refreshToken = req.cookies.jid;
  if (!refreshToken) return res.status(401).send({ok: false, message: 'Try to login before'})

  const tokenDeleted = await Token.deleteOne({ token: refreshToken });
  if(tokenDeleted.n === 0) return res.status(404).send({ok: false, message: 'Try to login before'});
  res.status(204).send({ok: true, message:''});
}
