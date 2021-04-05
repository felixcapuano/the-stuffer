const stuffRouter = require('express').Router();
const validation = require('../validation/validation');


stuffRouter.post('/:collection/create', validation('create'), async (req, res) => {
  const Model = moels[req.params.collection];
  if (!Model) return res.sendStatus(500);

  const model = new Model(req.body);
  await model.save().then(
    doc => res.status(201).send(doc),
    err => res.sendStatus(500)
  );
});

stuffRouter.get('/:collection/get/:id', async (req, res) => {
  const Model = mdels[req.params.collection];
  if (!Model) return res.sendStatus(500);

  const id = req.params.id;
  await Model.findById(id).then(
    doc => {
      if (!doc) res.sendStatus(404);
      else res.status(200).send(doc);
    },
    err => res.status(500)
  );
});

stuffRouter.put('/:collection/update/:id', validation('update'), async (req, res) => {
  // TODO change reaction pushing
  const id = req.params.id;
  if (req.body.reaction) {
    req.body.$push = { reactions: req.body.reaction };
    delete req.body.reaction;
  }

  const Model = models[req.params.collection];
  if (!Model) return res.sendStatus(500);

  req.body.last_update_date = Date.now();

  await Model.findByIdAndUpdate(id, req.body).then(
    doc => {
      if (!doc) res.sendStatus(404);
      else res.status(200).send(doc);
    },
    err => res.sendStatus(500)
  );
});

stuffRouter.delete('/:collection/delete/:id', async (req, res) => {
  const Model = models[req.params.collection];
  if (!Model) return res.sendStatus(500);

  const id = req.params.id;
  await Model.findById(id).then(
    async doc => {
      if (!doc) res.sendStatus(404);
      else {
        if (!doc.deleted) doc.deleted = true;
        else doc.deleted = !doc.deleted;

        await doc.save().then(
          doc => res.status(200).send(doc),
          err => res.sendStatus(500)
        );
      }
    },
    err => res.sendStatus(500)
  );
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

  await Model.find(req.body).then(
    doc => res.status(200).send(doc),
    err => res.sendStatus(500)
  )
});

module.exports = stuffRouter;