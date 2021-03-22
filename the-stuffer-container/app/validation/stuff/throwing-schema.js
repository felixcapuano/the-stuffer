exports.stcSchema = {
    "hit_id": {
        isString: {
            errorMessage: "not string"
        },
        errorMessage: "missing hit_id",
    },
    "lat": {
        isFloat: {
            errorMessage: "not float"
        },
        errorMessage: "missing lat",
    },
    "lng": {
        isFloat: {
            errorMessage: "not float"
        },
        errorMessage: "missing lng",
    },
    "type": {
        isString: {
            errorMessage: "not string"
        },
        isIn: {
            options: ["throw", "jumpthrow", "runjumpthrow"]
        },
        errorMessage: "Missing type",
    },
    "yt_id": {
        isString: {
            errorMessage: "not string"
        },
        isLength: {
            options: {
                min: 11,
                max: 11
            }
        },
        errorMessage: "missing yt_id",
    },
    "yt_start_time": {
        isInt: {
            options: {
                min: 0,
            },
            errorMessage: "not int"
        },
        errorMessage: "missing yt_start_time",
    },
    "ticks64": {
        isBoolean: {
            errorMessage: "not boolean"
        },
        errorMessage: "missing ticks64",
    },
    "ticks128": {
        isBoolean: {
            errorMessage: "not boolean"
        },
        errorMessage: "missing ticks128",
    },
    "description": {
        isString: {
            errorMessage: "not string"
        },
        isLength: {
            options: {
                max: 255
            }
        },
        errorMessage: "missing description",
    }
};

exports.stdSchema = {

};

exports.stgSchema = {

};

exports.stuSchema = {

};