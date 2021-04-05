const mongoose = require('mongoose');
let ObjectID = require("mongodb").ObjectID;

const models = require('./models');

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