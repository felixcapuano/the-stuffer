const common = require('./common-schema');

const landingProperties = {
  ...common.collectionProperties,
  type: {
    type: 'string',
    enum: ['smoke', 'molotov', 'flash'],
  },
  map: {
    type: 'string',
    enum: [
      'de_mirage',
      'de_dust2',
      'de_inferno',
      'de_nuke',
      'de_vertigo',
      'de_overpass',
      'de_train',
    ],
  },
};

exports.create = {
  type: 'object',
  properties: {
    ...landingProperties,
    ...common.positionProperties,
  },
  required: ['collection', 'type', 'map', 'position'],
  additionalProperties: false,
};

exports.update = {
  type: 'object',
  properties: {
    ...landingProperties,
    ...common.positionProperties,
  },
  required: ['collection'],
  additionalProperties: false,
};

exports.search = {
  type: 'object',
  properties: {
    ...landingProperties,
    ...common.searchPositionProperties,
  },
  required: ['map', 'collection'],
  additionalProperties: false,
};