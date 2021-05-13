const { User } = require('../mongo/model');

exports.getUser = async (req, res) => {
  const id = req.body._user.id;
  try {
    const doc = await User.findById(id, { password: 0 });
    if (!doc || doc.deleted) return await res.sendStatus(404);

    return await res.send({ ok: true, message: 'Success', hit: doc });
  } catch (err) {
    console.error(err);
    return await res.send({ ok: false, message: '' });
  }
};
