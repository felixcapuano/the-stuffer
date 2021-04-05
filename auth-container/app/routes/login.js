const bcrypt = require('bcryptjs');

const validation = require('../validation');
const { User } = require('../mongo/model');


module.exports = async (req, res) => {
  const valid = validation.login(req.body);
  if (!valid) return res.status(400).send(validation.login.errors)

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ message: 'Email or password is wrong'})

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send({ message: 'Email or password is wrong'})

  res.sendStatus(200);
};