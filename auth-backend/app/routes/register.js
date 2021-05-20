const bcrypt = require('bcryptjs');
const validation = require('../validation');

const { User } = require('../mongo/model');

module.exports = async (req, res) => {
  const valid = validation.register(req.body);
  const _username = req.body.username.toLowerCase();
  const _email = req.body.email.toLowerCase();

  if (!valid)
    return await res.send({
      ok: false,
      message: 'Bad format',
      errors: validation.login.errors,
    });

  // TODO maybe add try/catch
  const emailExist = await User.findOne({
    $or: [{ email: _email }, { username: _username }],
  });
  if (emailExist)
    return await res.send({
      ok: false,
      message: 'Email or username already exist',
    });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: _username,
    password: hashPassword,
    email: _email,
  });

  try {
    const savedUser = await user.save();
    return await res.send({ ok: true, message: 'Success', user: user._id });
  } catch (err) {
    return await res.send({ ok: false, message: 'Internal error' });
  }
};
