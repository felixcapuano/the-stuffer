const { User } = require('../mongo/model');
const validation = require('../validation');

const TIMEOUT = 60;
let tokens = [];

const cleanToken = () => {
  tokens = tokens.filter(
    (token) => token.expirationTime > new Date().getTime()
  );
};

const generateToken = (max) => {
  return String(Math.floor(Math.random() * max)).padStart(8, '0');
};

exports.sendEmail = async (req, res) => {
  try {
    const doc = await User.findById(req.body._user.id);
    if (doc.verified)
      return await res.send({ ok: false, message: 'User already verified' });
  } catch (error) {
    console.error(error);
    return await res.send({ ok: false, message: 'Internal error' });
  }

  const _token = generateToken(99999999);
  tokens.push({
    id: req.body._user.id,
    expirationTime: new Date().getTime() + TIMEOUT * 1000,
    token: _token,
  });
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
    (t) => t.token === req.body.token && t.id === req.body._user.id
  );
  if (matchs.length === 0) {
    return await res.send({ ok: false, message: 'Wrong or expire token.' });
  }
  res.send({ ok: true, message: '' });
};
