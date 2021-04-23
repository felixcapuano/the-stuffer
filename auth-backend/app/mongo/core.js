const mongoose = require('mongoose');
const { User } = require('./model');

const PORT = process.env.MONGO_PORT;
const HOST = process.env.MONGO_HOST;
const DATABASE = process.env.MONGO_DATABASE;
const USERNAME = process.env.AUTH_MONGO_USERNAME;
const PASSWORD = process.env.AUTH_MONGO_PASSWORD;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 60000,
  serverSelectionTimeoutMS: 60000,
  heartbeatFrequencyMS: 5000,
  useFindAndModify: false,
};

const uri = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
exports.connect = () => {
  console.log('Trying to connect to mongo');
  console.log('uri : ' + uri);
  mongoose.connect(uri, options).then(
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
