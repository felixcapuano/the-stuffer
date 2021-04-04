const mongoose = require('mongoose');
var ObjectID = require("mongodb").ObjectID;

const { landingSchema } = require('./landing-schema');
const { throwingSchema } = require('./throwing-schema');

const USERNAME = process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PASSWORD;
const PORT = process.env.MONGO_PORT;
const HOST = process.env.MONGO_HOST;
const DATABASE = process.env.MONGO_DATABASE;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 60000,
  serverSelectionTimeoutMS: 5000,
  heartbeatFrequencyMS: 5000,
  useFindAndModify: false,
}

const uri = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
exports.connect = () => {
  console.log('Mongo trying to connect to : ' + uri);
  mongoose.connect(uri, options).then(
    () => console.log('Mongo connection established!'),
    () => console.log('Mongo connection failed!')
  );
}

const db = mongoose.connection;
db.on('error', e => console.log('Mongo error : ' + e.message));
db.on('disconnected', () => console.log('Connection interrupted'));

exports.isConnected = (req, res, next) => {
  const state = mongoose.connection.readyState;
  state === 1 ? next() : res.sendStatus(500)
}

exports.isIdValid = (req, res, next) => {
  const id = req.params.id;
  (id && ObjectID.isValid(id)) ? next() : res.sendStatus(404)
}

const models = {
  throwing: mongoose.model('Throwing', throwingSchema),
  landing: mongoose.model('Landing', landingSchema),
}

exports.createStuff = async (req, res) => {
  const Model = models[req.params.collection];
  if (!Model) return res.sendStatus(404);

  const model = new Model(req.body);
  await model.save().then(
    doc => res.status(200).send(doc),
    err => res.sendStatus(500)
  );
}

exports.getStuff = async (req, res) => {
  const Model = models[req.params.collection];
  if (!Model) return res.sendStatus(404);

  const id = req.params.id;
  await Model.findById(id).then(
    doc => {
      if (!doc) res.sendStatus(404);
      else res.status(200).send(doc);
    },
    err => res.status(500)
  );
}

exports.updateStuff = async (req, res) => {
  // TODO change reaction pushing
  const id = req.params.id;
  if (req.body.reaction) {
    req.body.$push = { reactions: req.body.reaction };
    delete req.body.reaction;
  }

  const Model = models[req.params.collection];
  if (!Model) return res.sendStatus(404);

  req.body.last_update_date = Date.now();

  await Model.findByIdAndUpdate(id, req.body).then(
    doc => {
      if (!doc) res.sendStatus(404);
      else res.status(200).send(doc);
    },
    err => res.sendStatus(500)
  );
}

exports.deleteStuff = async (req, res) => {
  const Model = models[req.params.collection];
  if (!Model) return res.sendStatus(404);

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
}

exports.searchStuff = async (req, res) => {
  const Model = models[req.params.collection];
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
}