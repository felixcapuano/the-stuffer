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
    bufferCommands: false,
}

exports.mongoConnect = async () => {

    const uri = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;
    console.log('Mongo trying to connect to : ' + uri);
    mongoose.connect(uri, options)
        .catch(e => {})
}

const db = mongoose.connection;
db.on('error', e => console.error('Mongo error : ' + e.message));
db.on('disconnected', async () => {
    console.log('Mongo connection interrupted!');
    await this.mongoConnect();
});
db.once('open', async () => {
    console.log('Mongo connection established!');
});


const Throwing = mongoose.model('Throwing', throwingSchema);

exports.createThrowing = async (req, res, next) => {
    const newThrowing = new Throwing(req.body);
    await newThrowing.save().
        then(() => res.sendStatus(200)).
        catch(err => res.status(500).send(err));
}