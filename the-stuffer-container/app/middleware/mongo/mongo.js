const { throwingSchema } = require('./throwing-schema');
const mongoose = require('mongoose');

const USERNAME = process.env.MONGO_USERNAME;
const PASSWORD = process.env.MONGO_PASSWORD;
const PORT = process.env.MONGO_PORT;
const HOST = process.env.MONGO_HOST;
const DATABASE = process.env.MONGO_DATABASE;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
    heartbeatFrequencyMS: 5000,
}

const uri = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;

const db = mongoose.connection;
db.on('error', e => console.log('Mongo error : ' + e.message));
db.on('disconnected', () => console.log('Connection interrupted'));
db.once('open', () => console.log('Mongo connection established!'));
console.log(mongoose.connection)

exports.connectDatabase = () => {
    console.log('Mongo trying to connect to : ' + uri);
    return mongoose.connect(uri, options);
}

exports.isMongoConnected = (req,res, next) => {
    const state = mongoose.connection.readyState;
    state === 1 ? next() : res.sendStatus(500)
}

const Throwing = mongoose.model('Throwing', throwingSchema);

exports.createThrowing = (req, res, next) => {
    console.log('create throwing')
    const throwing = new Throwing(req.body);
    throwing.save(err => {if(err) console.log(err)});
    res.sendStatus(200);
}
