const stuffRouter = require('express').Router();

const validation = require('../validation/validation');
const models = require('../mongo/models');
const { isAuth } = require('../auth');
const { cleanEmpty } = require('../utils');

stuffRouter.post('/create', validation('create'), isAuth, async (req, res) => {
  const collection = req.body.collection;

  if (collection === 'landing') {
    if (!(req.body._user.role === 'admin'))
      return await res.send({ ok: false, message: 'Access denied' });
  }

  req.body.creator = req.body._user.id;

  const model = new models[collection](req.body);
  try {
    const doc = await model.save();
    return await res.send({ ok: true, message: 'Success', _id: doc._id });
  } catch (err) {
    console.error(err);
    return await res.send({ ok: false, message: '' });
  }
});

stuffRouter.get('/:collection/get/:id', async (req, res) => {
  const Model = models[req.params.collection];
  if (!Model) return await res.sendStatus(404);

  const id = req.params.id;
  try {
    const doc = await Model.findById(id);
    if (!doc || doc.deleted) return await res.sendStatus(404);

    return await res.send({ ok: true, message: 'Success', hit: doc });
  } catch (err) {
    console.error(err);
    return await res.send({ ok: false, message: '' });
  }
});

stuffRouter.put(
  '/update/:id',
  isAuth,
  validation('update'),
  async (req, res) => {
    // TODO change reaction pushing
    if (req.body.reaction) {
      req.body.$push = { reactions: req.body.reaction };
      delete req.body.reaction;
    }

    const Model = models[req.body.collection];

    req.body.last_update_date = Date.now();

    const id = req.params.id;
    try {
      const doc = await Model.findByIdAndUpdate(id, req.body);
      if (!doc) return await res.send({ ok: false, message: '' });

      return await res.send({ ok: true, message: '', _id: doc._id });
    } catch (err) {
      return await res.send({ ok: false, message: '' });
    }
  }
);

stuffRouter.delete('/delete/:id', async (req, res) => {
  const Model = models[req.body.collection];

  const id = req.params.id;
  try {
    const doc = await Model.findById(id);
    if (!doc) return await res.send({ ok: false, message: '' });

    doc.deleted = !doc.deleted ? true : !doc.deleted;

    await doc.save();

    return await res.send({ ok: true, message: 'Success', _id: doc._id });
  } catch (err) {
    return await res.send({ ok: false, message: '' });
  }
});

stuffRouter.post('/search', validation('search'), async (req, res) => {
  const Model = models[req.body.collection];

  let payload = { ...req.body };
  delete payload.collection;
  delete payload.position;
  delete payload.tickrate;

  const pos = req.body.position;
  if (pos?.lat !== undefined) {
    // TODO improve sytax
    payload['position.lat'] = cleanEmpty({
      $gte: pos.lat?.gt,
      $lte: pos.lat?.lt,
    });
  }
  if (pos?.lng !== undefined) {
    payload['position.lng'] = cleanEmpty({
      $gte: pos.lng?.gt,
      $lte: pos.lng?.lt,
    });
  }
  if (pos?.floor !== undefined) {
    payload['position.floor'] = req.body.position.floor;
  }

  if (req.body.tickrate?.['64'] !== undefined) {
    payload['tickrate.64'] = req.body.tickrate['64'];
  }
  if (req.body.tickrate?.['128'] !== undefined) {
    payload['tickrate.128'] = req.body.tickrate['128'];
  }

  try {
    const doc = await Model.find(payload, {});

    return await res.send({ ok: true, message: 'Success', hits: doc });
  } catch (err) {
    return await res.send({ ok: false, message: '' });
  }
});

module.exports = stuffRouter;
