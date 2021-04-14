const CONST = require('./schema');

const properties = {
  collection: { type: 'string', enum: CONST.COLLECTION_LIST },
  type: { type: 'string', enum: CONST.STUFF_LIST },
  map: {
    type: 'string',
    enum: CONST.MAP_LIST,
  },
  position: {
    type: 'object',
    properties: {
      lat: { type: 'number' },
      lng: { type: 'number' },
      floor: { type: 'integer', minimum: 0 },
    },
    required: ['lat', 'lng', 'floor'],
    additionalProperties: false,
  },
};

exports.create = {
  type: 'object',
  properties: properties,
  required: ['collection', 'type', 'map', 'position'],
  additionalProperties: false,
};

exports.update = {
  type: 'object',
  properties: properties,
  required: ['collection'],
  additionalProperties: false,
};

exports.search = {
  type: 'object',
  properties: {
    collection: { type: 'string', enum: CONST.COLLECTION_LIST },
    map: {
      type: 'string',
      enum: CONST.MAP_LIST,
    },
    type: { type: 'string', enum: CONST.STUFF_LIST },
    position: CONST.UPDATE_POSITION,
  },
  required: ['map', 'collection'],
  additionalProperties: false,
};
