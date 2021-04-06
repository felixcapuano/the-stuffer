const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const reactionSchema = new Schema({
  "hyped": { "type": Boolean },
  "user": { "type": String },
  "hidden": { "type": Boolean, "default": false }
});

const throwingSchema = new Schema({
  "landing_id": String,
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
  "creator": String,
  "reactions": { "type": [reactionSchema], "default": [] },
  "deleted": { "type": Boolean, "default": false },
});

const landingSchema = new Schema({
  "map": String,
  "type": String,
  "position": {
    "lat": Number,
    "lng": Number,
    "floor": Number,
  },
  "creation_date": { "type": Date, "default": Date.now },
  "creator": String,
  "last_update_date": { "type": Date, "default": Date.now },
  "deleted": { "type": Boolean, "default": false },
});

module.exports = {
  throwing: mongoose.model('Throwing', throwingSchema),
  landing: mongoose.model('Landing', landingSchema),
}