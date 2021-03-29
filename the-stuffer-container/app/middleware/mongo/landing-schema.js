const { Schema } = require('mongoose');

exports.landingSchema = new Schema({
  "map": String,
  "type": String,
  "position": {
    "lat": Number,
    "lng": Number,
    "floor": Number,
  },
  "creation_date": { "type": Date, "default": Date.now },
  "last_update_date": { "type": Date, "default": Date.now },
  "deleted": { "type": Boolean, "default": false },
});