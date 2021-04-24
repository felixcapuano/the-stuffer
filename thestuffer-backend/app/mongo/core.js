const mongoose = require('mongoose');
let ObjectID = require('mongodb').ObjectID;

const models = require('./models');

const URI = process.env.STUFF_MONGO_URI;
if (!URI) throw new Error('STUFF_MONGO_URI not set.');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 60000,
  serverSelectionTimeoutMS: 60000,
  heartbeatFrequencyMS: 5000,
  useFindAndModify: false,
};

exports.connect = () => {
  console.log('uri : ' + URI);
  console.log('Trying to connect to mongo');
  mongoose.connect(URI, options).then(
    () => console.log('Mongo connection established!'),
    () => console.log('Mongo connection failed!')
  );

  const db = mongoose.connection;
  db.on('error', (e) => console.log('Mongo error : ' + e.message));
  db.on('disconnected', () => console.log('Connection interrupted'));
};

exports.isIdExist = async (model, id) => {
  try {
    const doc = await models[model].findById(id);
    return doc ? true : false;
  } catch (error) {
    return false;
  }
};
