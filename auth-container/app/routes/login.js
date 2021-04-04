const validation = require('../validation');

module.exports = async (req, res) => {
  const valid = validation.login(req.body);
  if (!valid) return res.status(400).send(validation.login.errors)

};