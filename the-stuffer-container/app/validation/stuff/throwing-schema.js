exports.stcSchema = {
    "hit_id": {
        isString: true,
    },
    "lat": {
        isFloat: true,
    },
    "lng": {
        isFloat: true,
    },
    "type": {
        isString: true,
        isIn: ["throw", "jumpthrow", "runjumpthrow"]
    },
    "yt_id": {
        isString: true,
        isLength: {
            options: {
                min: 11,
                max: 11
            }
        }
    },
    "yt_start_time": {
        isInt: {
            options: {
                min: 0,
            }
        },
    },
    "ticks64": {
        isBoolean: true,
    },
    "ticks128": {
        isBoolean: true,
    },
    "description": {
        isString: true,
        isLength: {
            options: {
                max: 255
            }
        }
    }
};

exports.stdSchema = {

};

exports.stgSchema = {

};

exports.stuSchema = {

};