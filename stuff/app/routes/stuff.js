const validation = require('../validation/validation');
const models = require('../mongo/models');
const { landingIdExist } = require('../mongo/core');
const { isAuth } = require('../auth');

const stuffRouter = require('express').Router();

stuffRouter.post('/:collection/create', isAuth , validation('create'), async (req, res) => {
  const collection = req.params.collection;
  const Model = models[collection];
  if (!Model) return res.send({ ok: false, message: '' });

  if (collection==='throwing') {
    const idExist = await landingIdExist(req.body.landing_id);
    if (!idExist) return res.send({ ok: false, message: '' });
  }

  const model = new Model(req.body);
  try {
    const doc = await model.save();
    return res.send({ ok: true, message: 'Success', _id: doc._id});
  }
  catch(err) {
    console.error(err);
    return res.send({ ok: false, message: '' });
  }
});

stuffRouter.get('/:collection/get/:id', async (req, res) => {
  const Model = models[req.params.collection];
  if (!Model) return res.send({ ok: false, message: '' });

  const id = req.params.id;
  try {
    const doc = await Model.findById(id);
    if (!doc) return res.send({ ok: false, message: '' });

    return res.send({ ok: true, message: 'Success', _id: doc._id});
  }
  catch(err) {
    console.error(err)
    return res.status({ok: false, message: ''});
  }
});

stuffRouter.put('/:collection/update/:id', isAuth, validation('update'), async (req, res) => {
  // TODO change reaction pushing
  if (req.body.reaction) {
    req.body.$push = { reactions: req.body.reaction };
    delete req.body.reaction;
  }

  const Model = models[req.params.collection];
  if (!Model) return res.send({ok: false, message: ''});

  req.body.last_update_date = Date.now();

  const id = req.params.id;
  try {
    const doc = await Model.findByIdAndUpdate(id, req.body);
    if (!doc) return res.send({ok: false, message: ''});

    return res.send({ ok: true, message: '', _id: doc._id});
  }
  catch(err) {
    return res.send({ ok: false, message: '' });
  }

});

stuffRouter.delete('/:collection/delete/:id', async (req, res) => {
  const Model = models[req.params.collection];
  if (!Model) return res.send({ok: false, message: ''});

  const id = req.params.id;
  try {
    const doc = await Model.findById(id);
    if (!doc) return res.send({ok: false, message: ''});

    doc.deleted = (!doc.deleted) ? true:!doc.deleted;

    await doc.save();

    return res.send({ ok: true, message: 'Success', _id: doc._id});
  }
  catch(err) {
    return res.send({ ok: false, message: '' });
  }
});

stuffRouter.post('/:collection/search', validation('search'), async (req, res) => {
  const Model = models[req.params.collection];
  if (!Model) return res.send({ok: false, message: ''});

  const pos = req.body.position;
  if (pos) {
    req.body["position.lat"] = { $gte: pos.lat?.gt, $lte: pos.lat?.lt };
    req.body["position.lng"] = { $gte: pos.lng?.gt, $lte: pos.lng?.lt };
    delete req.body.position;
  }

  if (req.body.tickrate?.['64'] !== undefined) {
    req.body["tickrate.64"] = req.body.tickrate['64'];
  }
  if (req.body.tickrate?.['128'] !== undefined) {
    req.body["tickrate.128"] = req.body.tickrate['128'];
  }
  delete req.body.tickrate;

  try {
    const doc = await Model.find(req.body);

    return res.send({ ok: true, message: 'Success' , data: doc});
  }
  catch(err) {
    return res.send({ ok: false, message: '' });
  }
});

module.exports = stuffRouter;