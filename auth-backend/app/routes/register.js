const bcrypt = require('bcryptjs');
const validation = require('../validation');

const { User } = require('../mongo/model');


module.exports = async (req, res) => {
  const valid = validation.register(req.body);
  if (!valid) return res.send({ ok: false, message: 'Bad format', errors: validation.login.errors})

  // TODO maybe add try/catch
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.send({ok: false, message: 'Email already exist' });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashPassword,
    email: req.body.email,
  });

  try {
    const savedUser = await user.save();
    return res.send({ok: true, message: 'Success', user: user._id });
  } catch(err) {
    return res.send({ok: false, message: 'Internal error'});
  }
};