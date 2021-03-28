const { Schema } = require('mongoose');

const reactionSchema = new Schema({
  "hyped": { "type": Boolean },
  "user": { "type": String },
  "hidden": { "type": Boolean, "default": false }
});

exports.throwingSchema = new Schema({
  "landing_id": String,
  "type": { "type": String },
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
  "last_update_date": { "type": Date, "default": Date.now },
  "reactions": { "type": [reactionSchema], "default": [] },
  "deleted": { "type": Boolean, "default": false },
});