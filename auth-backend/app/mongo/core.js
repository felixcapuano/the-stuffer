const mongoose = require('mongoose');
const { User } = require('./model');

const URI = process.env.MONGO_URI;
if (!URI) throw new Error('MONGO_URI not set.');
const USER = process.env.AUTH_MONGO_USERNAME;
if (!USER) throw new Error('AUTH_MONGO_USERNAME not set.');
const PASS = process.env.AUTH_MONGO_PASSWORD;
if (!PASS) throw new Error('AUTH_MONGO_PASSWORD not set.');

const options = {
  user: USER,
  pass: PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 60000,
  serverSelectionTimeoutMS: 60000,
  heartbeatFrequencyMS: 5000,
  useFindAndModify: false,
};

exports.connect = () => {
  console.log('Trying to connect to mongo');
  console.log('uri : ' + URI);
  mongoose.connect(URI, options).then(
    () => console.log('Mongo connection establish!'),
    () => console.log('Mongo connection fail!')
  );

  const db = mongoose.connection;

  db.on('error', (e) => console.log('Mongo error : ' + e.message));
  db.on('disconnected', () => console.log('Connection interrupted'));
};

exports.isRefreshTokenExist = async (_token) => {
  try {
    const doc = await User.findOne({ token: _token });
    return doc ? true : false;
  } catch (error) {
    return false;
  }
};
