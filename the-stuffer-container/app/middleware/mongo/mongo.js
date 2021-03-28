const { throwingSchema } = require('./throwing-schema');
const mongoose = require('mongoose');
var ObjectID = require("mongodb").ObjectID

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

const Throwing = mongoose.model('Throwing', throwingSchema);
const models = {
    throwing: undefined,
    landing: undefined
}

exports.createThrowing = async (req, res) => {
    const throwing = new Throwing(req.body);
    await throwing.save().then(
        doc => res.status(200).send(doc),
        err => res.sendStatus(500)
    );
}

exports.getThrowingByID = async (req, res) => {
    const id = req.params.id;
    await Throwing.findById(id).then(
        doc => {
            if (!doc) res.sendStatus(404);
            else res.status(200).send(doc);
        },
        err => res.status(500)
    );
}

exports.updateThrowing = async (req, res) => {
    const id = req.params.id;
    if (req.body.new_reaction) {
        req.body.$push = { reactions: req.body.new_reaction };
        delete req.body.new_reaction;
    }

    await Throwing.findByIdAndUpdate(id, req.body).then(
        doc => {
            if (!doc) res.sendStatus(404);
            else res.status(200).send(doc);
        },
        err => res.sendStatus(500)
    );

}

exports.deleteThrowingStuff = async (req, res) => {
    const id = req.params.id;
    await Throwing.findById(id).then(
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