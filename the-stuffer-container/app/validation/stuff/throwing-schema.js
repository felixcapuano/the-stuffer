exports.stcSchema = {
    "landing_id": {
        isString: { errorMessage: "not string" },
        errorMessage: "missing hit_id",
    },
    "position": {
        isObject: { errorMessage: "not object" },
        errorMessage: "missing position",
    },
    "position.lat": {
        isFloat: { errorMessage: "not float" },
        errorMessage: "missing lat",
    },
    "position.lng": {
        isFloat: { errorMessage: "not float" },
        errorMessage: "missing lng",
    },
    "position.floor": {
        isInt: {
            options: { min: 0, },
            errorMessage: "not int"
        },
        optional: { options: { nullable: true } }
    },
    "type": {
        isString: { errorMessage: "not string" },
        isIn: { options: ["throw", "jumpthrow", "runjumpthrow"] },
        errorMessage: "Missing type",
    },
    "video.id": {
        isString: { errorMessage: "not string" },
        isLength: {
            options: { min: 11, max: 11 },
            errorMessage: "length isn't equal to 11"
        },
        errorMessage: "missing yt_id",
    },
    "video.time": {
        isInt: {
            options: { min: 0, },
            errorMessage: "not int"
        },
        errorMessage: "missing yt_start_time",
    },
    "tickrate.64": {
        isBoolean: { errorMessage: "not boolean" },
        errorMessage: "missing ticks64",
    },
    "tickrate.128": {
        isBoolean: { errorMessage: "not boolean" },
        errorMessage: "missing ticks128",
    },
    "description": {
        isString: { errorMessage: "not string" },
        isLength: { options: { max: 255 } },
        errorMessage: "missing description",
    }
};

exports.stdSchema = {

};

exports.stgSchema = {

};

exports.stuSchema = {

};