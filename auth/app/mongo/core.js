const mongoose = require('mongoose');

const PORT     = process.env.MONGO_PORT;
const HOST     = process.env.MONGO_HOST;
const DATABASE = process.env.MONGO_DATABASE;
const USERNAME = process.env.AUTH_MONGO_USERNAME;
const PASSWORD = process.env.AUTH_MONGO_PASSWORD;

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
  console.log('Trying to connect to mongo');
  mongoose.connect(uri, options).then(
    () => console.log('Mongo connection establish!'),
    () => console.log('Mongo connection fail!')
  );
}