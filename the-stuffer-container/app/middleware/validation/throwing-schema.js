exports.create = {
  type: "object",
  properties: {
    landing_id: {type: "string"},
    type: {type: "string", enum: ["smoke", "flash", "molotov"]},
    movement: {type: "string", enum: ["throw", "jumpthrow", "runjumpthrow"]},
    position: {
        type: "object",
        properties: {
            lat: {type: "number"},
            lng: {type: "number"},
            floor: {type: "integer", minimum: 0},
        },
        required: ["lat","lng","floor"],
        additionalProperties: false,
    },
    video: {
        type: "object",
        properties: {
            id: {type: "string"},
            time: {type: "integer"},
        },
        required:["id","time"],
        additionalProperties: false,
    },
    tickrate: {
        type: "object",
        properties: {
            "64": {type: "boolean"},
            "128": {type: "boolean"},
        },
        required:["64","128"],
        additionalProperties: false,
    },
    description: {type: "string", maxLength: 255},
  },
  required: ["landing_id",
      "type",
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
    landing_id: {type: "string"},
    type: {type: "string", enum: ["smoke", "flash", "molotov"]},
    movement: {type: "string", enum: ["throw", "jumpthrow", "runjumpthrow"]},
    position: {
        type: "object",
        properties: {
            lat: {type: "number"},
            lng: {type: "number"},
            floor: {type: "integer", minimum: 0},
        },
        required: ["lat","lng"],
        additionalProperties: false,
    },
    video: {
        type: "object",
        properties: {
            id: {type: "string"},
            time: {type: "integer"},
        },
        required:["id","time"],
        additionalProperties: false,
    },
    tickrate: {
        type: "object",
        properties: {
            "64": {type: "boolean"},
            "128": {type: "boolean"},
        },
        additionalProperties: false,
    },
    description: {type: "string", maxLength: 255},
    new_reaction: {
        type: "object",
        properties: {
            "hyped": { type: "boolean"},
            "user": { type: "string"},
            "hidden": { type: "boolean"},
        },
        required: ["hyped","user","hidden"],
        additionalProperties: false
    }
  },
  additionalProperties: false,
};

exports.search = {

};