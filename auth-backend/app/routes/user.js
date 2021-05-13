const { User } = require('../mongo/model');

exports.getUser = async (req, res) => {
  req.body._user.password = undefined;
  await res.send({ ok: true, message: 'Success', hit: req.body._user });
};
