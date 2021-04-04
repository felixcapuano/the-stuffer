const properties = {
  landing_id: { type: "string" },
  movement: { type: "string", enum: ["throw", "jumpthrow", "runjumpthrow"] },
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
  video: {
    type: "object",
    properties: {
      id: { type: "string" },
      time: { type: "integer" },
    },
    required: ["id", "time"],
    additionalProperties: false,
  },
  tickrate: {
    type: "object",
    properties: {
      "64": { type: "boolean" },
      "128": { type: "boolean" },
    },
    required: ["64", "128"],
    additionalProperties: false,
  },
  description: { type: "string", maxLength: 255 },
};

exports.create = {
  type: "object",
  properties: properties,
  required: ["landing_id",
    "movement",
    "description",
    "position",
    "video",
    "tickrate",
  ],
  additionalProperties: false,
};

exports.update = {
  type: "object",
  properties: {
    ...properties,
    reaction: {
      type: "object",
      properties: {
        hyped: { type: "boolean" },
        user: { type: "string" },
        hidden: { type: "boolean"},
      },
      required: ["hyped","user","hidden"],
      additionalProperties: false,
    },

  },
  additionalProperties: false,
};

exports.search = {
  type: "object",
  properties: {
    landing_id: { type: "string" },
    movement: { type: "string", enum: ["throw", "jumpthrow", "runjumpthrow"] },
    position: {
      type: "object",
      properties: {
        lat: {
          type: "object",
          properties: {
            gt: { type: "number" },
            lt: { type: "number" },
          },
          additionalProperties: false,
        },
        lng: {
          type: "object",
          properties: {
            gt: { type: "number" },
            lt: { type: "number" },
          },
          additionalProperties: false,
        },
        floor: { type: "integer", minimum: 0 },
      },
      required: ["lat", "lng", "floor"],
      additionalProperties: false,
    },
    tickrate: {
      type: "object",
      properties: {
        "64": { type: "boolean"},
        "128": { type: "boolean"},
      },
      additionalProperties: false,
    },
  },
  //required: ["landing_id"],
  additionalProperties: false,
};