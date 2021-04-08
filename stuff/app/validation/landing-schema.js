const properties = {
  collection: { type: "string", enum: ["twrowing", "landing"] },
  type: { type: "string", enum: ["smoke", "flash", "molotov"] },
  map: {
    type: "string",
    enum: ["mirage", "dust2", "inferno", "nuke", "vertigo", "overpass", "train"],
  },
  position: {
    type: "object",
    properties: {
      lat: { type: "number" },
      lng: { type: "number" },
      floor: { type: "integer", minimum: 0 },
    },
    required: ["lat", "lng", "floor"],
    additionalProperties: false,
  },
};

exports.create = {
  type: "object",
  properties: properties,
  required: [
    'collection',
    "type",
    "map",
    "position",
  ],
  additionalProperties: false,
};

exports.update = {
  type: "object",
  properties: properties,
  required: ['collection'],
  additionalProperties: false,
};

exports.search = {
  type: "object",
  properties: {
    collection: { type: 'string', enum: ['twrowing', 'landing'] },
    map: {
      type: "string",
      enum: ["mirage", "dust2", "inferno", "nuke", "vertigo", "overpass", "train"],
    },
    type: { type: "string", enum: ["smoke", "flash", "molotov"] },
    position: {
      type: "object",
      properties: {
        lat: {
          type: "object",
          properties: {
            gt: { type: "number" },
            lt: { type: "number" },
          },
          required: ["gt","lt"],
          additionalProperties: false,
        },
        lng: {
          type: "object",
          properties: {
            gt: { type: "number" },
            lt: { type: "number" },
          },
          required: ["gt","lt"],
          additionalProperties: false,
        },
        floor: { type: "integer", minimum: 0 },
      },
      required: ["lat", "lng", "floor"],
      additionalProperties: false,
    },
  },
  required: ['map', 'collection'],
  additionalProperties: false,
};