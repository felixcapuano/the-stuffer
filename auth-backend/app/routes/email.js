const validation = require('../validation');
const nodemailer = require('nodemailer');
const { User } = require('../mongo/model');

const TIMEOUT = 60 * 5;
let tokens = [];

const cleanToken = () => {
  tokens = tokens.filter(
    (token) => token.expirationTime > new Date().getTime()
  );
};

const generateToken = (max) => {
  return String(Math.floor(Math.random() * max)).padStart(8, '0');
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD,
  },
});

exports.sendEmail = async (req, res) => {
  if (req.body._user.verified)
    return await res.send({ ok: false, message: 'User already verified' });

  const _token = generateToken(99999999);

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: req.body._user.email,
      subject: 'thestuffer.com : verification token',
      text: 'The token is : ' + _token,
    });
  } catch (error) {
    console.error(error);
    return await res.send({ ok: false, message: 'Email fail' });
  }

  tokens.push({
    id: req.body._user._id,
    expirationTime: new Date().getTime() + TIMEOUT * 1000,
    token: _token,
  });
  console.log(tokens);

  await res.send({ ok: true, message: 'Message sent' });
};

exports.verifyEmail = async (req, res) => {
  cleanToken();

  const valid = validation.emailToken({ token: req.body.token });
  if (!valid) {
    return await res.send({
      ok: false,
      message: 'Bad format',
      errors: validation.login.errors,
    });
  }

  matchs = tokens.filter(
    (t) => t.token === req.body.token && t.id === req.body._user._id
  );

  if (matchs.length === 0) {
    return await res.send({ ok: false, message: 'Wrong or expire token.' });
  }

  try {
    const user = await User.findById(req.body._user._id);
    user.verified = true;
    await user.save();
  } catch (error) {
    console.error(error);
    return await res.send({ ok: false, message: 'Internal Error' });
  }

  res.send({ ok: true, message: 'Verification successful' });
};
