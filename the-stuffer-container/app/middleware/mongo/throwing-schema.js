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
    "creation_date": { "type": Date, "default": Date.now },
    "last_update_date": { "type": Date, "default": Date.now},
    "reactions": [{"hyped": Boolean, "user": String, "hidden": { "type": Boolean, "default": false}}],
    "deleted": {"type": Boolean, "default": false},
});