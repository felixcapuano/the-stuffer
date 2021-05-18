const common = require('./common-schema');

const throwingProperties = {
  ...common.collectionProperties,
  landing_id: { type: 'string', isIdExist: true },
  movement: {
    type: 'string',
    enum: ['throw', 'jumpthrow', 'runjumpthrow'],
  },
  video: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        minLength: 11,
        maxLength: 11,
      },
      time: {
        type: 'integer',
        minimum: 0,
        maximum: 86400,
      },
    },
    required: ['id', 'time'],
    additionalProperties: false,
  },
  tickrate: {
    type: 'object',
    properties: {
      64: { type: 'boolean' },
      128: { type: 'boolean' },
    },
    required: ['64', '128'],
    additionalProperties: false,
  },
  description: {
    type: 'string',
    minLength: 0,
    maxLength: 255,
  },
};

exports.create = {
  $async: true,
  type: 'object',
  properties: {
    ...throwingProperties,
    ...common.positionProperties,
  },
  required: [
    'collection',
    'landing_id',
    'movement',
    'description',
    'position',
    'video',
    'tickrate',
  ],
  additionalProperties: false,
};

exports.update = {
  $async: true,
  type: 'object',
  properties: {
    ...throwingProperties,
    ...common.positionProperties,
    like: { type: 'integer' },
    dislike: { type: 'integer' },
  },
  required: ['collection'],
  additionalProperties: false,
};

exports.search = {
  $async: true,
  type: 'object',
  properties: {
    ...throwingProperties,
    ...common.collectionProperties,
    ...common.searchPositionProperties,
    params: {
      type: 'object',
      properties: {
        page: { type: 'integer' },
        count: { type: 'integer' },
      },
    },
  },
  required: ['collection'],
  additionalProperties: false,
};
