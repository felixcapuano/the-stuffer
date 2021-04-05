const properties = {
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
  required: ["type",
    "map",
    "position",
  ],
  additionalProperties: false,
};

exports.update = {
  type: "object",
  properties: properties,
  additionalProperties: false,
};

exports.search = {
  type: "object",
  properties: {
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
  required: ["map"],
  additionalProperties: false,
};