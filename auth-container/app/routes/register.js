const bcrypt = require('bcryptjs');
const validation = require('../validation');
const { User } = require('../mongo/model');

module.exports = async (req, res) => {
  const valid = validation.register(req.body);
  if (!valid) return res.status(400).send(validation.register.errors)

  // TODO maybe add try/catch
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send({ message: 'Email already exist' });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    password: hashPassword,
    email: req.body.email,
  });

  try {
    const savedUser = await user.save();
    return res.status(201).send({user: user._id});
  } catch(err) {
    return res.status(500).send(err);
  }
};