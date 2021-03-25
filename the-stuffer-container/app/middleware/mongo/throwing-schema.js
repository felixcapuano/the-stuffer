const { Schema } = require('mongoose');

exports.throwingSchema = new Schema({
    "landing_id": String,
    "type": {"type": String},
    "movement": String,
    "position": {
        "lat": Number,
        "lng": Number,
        "floor": Number,
    },
    "video": {
        "id": String,
        "time": Number,
    },
    "tickrate": {
        "64": Boolean,
        "128": Boolean,
    },
    "description": String,
    "modification_date": {"type": [{ "type": Date, "default": Date.now}], "default":[]},
    "reaction": [{"hyped": Boolean, "user": String, "hidden": { "type": Boolean, "default": false}}],
    "hidden": {"type": Boolean, "default": false},
});