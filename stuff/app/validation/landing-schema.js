const CONST = require('./const');

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
    position: {
      type: 'object',
      properties: {
        lat: {
          type: 'object',
          properties: {
            gt: { type: 'number' },
            lt: { type: 'number' },
          },
          required: ['gt', 'lt'],
          additionalProperties: false,
        },
        lng: {
          type: 'object',
          properties: {
            gt: { type: 'number' },
            lt: { type: 'number' },
          },
          required: ['gt', 'lt'],
          additionalProperties: false,
        },
        floor: { type: 'integer', minimum: 0 },
      },
      required: ['lat', 'lng', 'floor'],
      additionalProperties: false,
    },
  },
  required: ['map', 'collection'],
  additionalProperties: false,
};
