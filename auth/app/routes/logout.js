const { Token } = require('../mongo/model');
const validation = require('../validation');

module.exports = async (req, res) => {
  const refreshToken = req.cookies.jid;
  if (!refreshToken) return res.send({ok: false, message: 'Try to login before'})

  const tokenDeleted = await Token.deleteOne({ token: refreshToken });
  if(tokenDeleted.n === 0) {
    return res.send({ok: false, message: 'Try to login before'});
  }
  res.cookie('jid', '').send({ok: true, message:'Success'});
}
