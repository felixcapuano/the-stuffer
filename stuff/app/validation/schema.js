exports.COLLECTION_LIST = ['throwing', 'landing'];

exports.STUFF_LIST = ['smoke', 'flash', 'molotov'];

exports.MOVEMENT_LIST = ['throw', 'jumpthrow', 'runjumpthrow'];

exports.MAP_LIST = [
  'de_mirage',
  'de_dust2',
  'de_inferno',
  'de_nuke',
  'de_vertigo',
  'de_overpass',
  'de_train',
];

exports.UPDATE_POSITION = {
  type: 'object',
  properties: {
    lat: {
      type: 'object',
      properties: {
        gt: { type: 'number' },
        lt: { type: 'number' },
      },
      additionalProperties: false,
    },
    lng: {
      type: 'object',
      properties: {
        gt: { type: 'number' },
        lt: { type: 'number' },
      },
      additionalProperties: false,
    },
    floor: { type: 'integer', minimum: 0 },
  },
  required: ['floor'],
  additionalProperties: false,
};
