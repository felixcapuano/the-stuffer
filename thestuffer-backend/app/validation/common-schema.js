exports.collectionProperties = {
  collection: {
    type: 'string',
    enum: ['throwing', 'landing'],
  },
};

exports.positionProperties = {
  position: {
    type: 'object',
    properties: {
      lat: {
        type: 'number',
        minimum: -360,
        maximum: 360,
      },
      lng: {
        type: 'number',
        minimum: -360,
        maximum: 360,
      },
      floor: {
        type: 'integer',
        minimum: 0,
        maximum: 3,
      },
    },
    required: ['lat', 'lng', 'floor'],
    additionalProperties: false,
  },
};

exports.searchPositionProperties = {
  position: {
    type: 'object',
    properties: {
      lat: {
        type: 'object',
        properties: {
          gt: {
            type: 'number',
            minimum: -360,
            maximum: 360,
          },
          lt: {
            type: 'number',
            minimum: -360,
            maximum: 360,
          },
        },
        additionalProperties: false,
      },
      lng: {
        type: 'object',
        properties: {
          gt: {
            type: 'number',
            minimum: -360,
            maximum: 360,
          },
          lt: {
            type: 'number',
            minimum: -360,
            maximum: 360,
          },
        },
        additionalProperties: false,
      },
      floor: {
        type: 'integer',
        minimum: 0,
        maximum: 100,
      },
    },
    required: ['floor'],
    additionalProperties: false,
  },
};

exports.reactionProperties = {
  reaction: {
    type: 'object',
    properties: {
      hyped: { type: 'boolean' },
      user: {
        type: 'string',
        maxLength: 24,
        minLength: 24,
      },
      hidden: { type: 'boolean' },
    },
    required: ['hyped', 'user', 'hidden'],
    additionalProperties: false,
  },
};

