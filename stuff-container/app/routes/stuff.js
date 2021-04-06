const validation = require('../validation/validation');
const models = require('../mongo/models');
const { landingIdExist } = require('../mongo/core');

const stuffRouter = require('express').Router();

stuffRouter.post('/:collection/create', validation('create'), async (req, res) => {
  const collection = req.params.collection;
  const Model = models[collection];
  if (!Model) return res.sendStatus(500);

  if (collection==='throwing') {
    const idExist = await landingIdExist(req.body.landing_id);
    if (!idExist) return res.sendStatus(400);
  }

  const model = new Model(req.body);
  try {
    const doc = await model.save();
    return res.status(201).send({ _id: doc._id});
  }
  catch(err) {
    return res.status(500).send(err);
  }
});

stuffRouter.get('/:collection/get/:id', async (req, res) => {
  const Model = models[req.params.collection];
  if (!Model) return res.sendStatus(500);

  const id = req.params.id;
  try {
    const doc = await Model.findById(id);
    if (!doc) return res.sendStatus(404);

    return res.status(200).send(doc);
  }
  catch(err) {
    return res.status(500).send(err);
  }
});

stuffRouter.put('/:collection/update/:id', validation('update'), async (req, res) => {
  // TODO change reaction pushing
  if (req.body.reaction) {
    req.body.$push = { reactions: req.body.reaction };
    delete req.body.reaction;
  }

  const Model = models[req.params.collection];
  if (!Model) return res.sendStatus(500);

  req.body.last_update_date = Date.now();

  const id = req.params.id;
  try {
    const doc = await Model.findByIdAndUpdate(id, req.body);
    if (!doc) return res.sendStatus(404);

    return res.status(200).send(doc);
  }
  catch(err) {
    return res.status(500).send(err);
  }
});

stuffRouter.delete('/:collection/delete/:id', async (req, res) => {
  const Model = models[req.params.collection];
  if (!Model) return res.sendStatus(500);

  const id = req.params.id;
  try {
    const doc = await Model.findById(id);
    if (!doc) return res.sendStatus(404);

    doc.deleted = (!doc.deleted) ? true:!doc.deleted;

    await doc.save();

    return res.status(200).send(doc);
  }
  catch(err) {
    return res.status(500).send(err);
  }
});

stuffRouter.post('/:collection/search', validation('search'), async (req, res) => {
  const Model = modls[req.params.collection];
  if (!Model) return res.sendStatus(404);

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

    return res.status(200).send(doc);
  }
  catch(err) {
    return res.status(500).send(err);
  }
});

module.exports = stuffRouter;