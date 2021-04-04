const validation = require('../validation');

module.exports = async (req, res) => {
  const valid = validation.register(req.body);
  if (!valid) return res.status(400).send(validation.register.errors)

  res.sendStatus(200);
};