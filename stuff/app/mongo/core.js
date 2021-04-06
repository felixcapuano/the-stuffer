const mongoose = require('mongoose');
let ObjectID = require("mongodb").ObjectID;

const models = require('./models');

const USERNAME = process.env.STUFF_MONGO_USERNAME;
const PASSWORD = process.env.STUFF_MONGO_PASSWORD;
const PORT =     process.env.STUFF_MONGO_PORT;
const HOST =     process.env.STUFF_MONGO_HOST;
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

  const db = mongoose.connection;
  db.on('error', e => console.log('Mongo error : ' + e.message));
  db.on('disconnected', () => console.log('Connection interrupted'));

}

exports.landingIdExist = async ( id) => {
  try {
    const doc = await models.landing.findById(id);
    return doc ? true: false;
  } catch (error) {
    return false;
  }
}