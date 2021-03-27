exports.stcSchema = {
    "landing_id": {
        isString: { errorMessage: "not string" },
        errorMessage: "missing hit_id",
    },
    "type": {
        isString: { errorMessage: "not string" },
        isIn: { 
            options: ["smoke", "flash", "molotov"],
            errorMessage: "not in: smoke, flash, molotov"
        },
        errorMessage: "missing type",
    },
    "movement": {
        isString: { errorMessage: "not string" },
        isIn: {
            options: ["throw", "jumpthrow", "runjumpthrow"],
            errorMessage: "not in: throw, jumpthrow, runjumpthrow"
        },
        errorMessage: "missing movement",
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
        errorMessage: "missing floor",
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

exports.stuSchema = {
    "landing_id": {
        isString: { errorMessage: "not string" },
        optional: { options: { nullable: true } }
    },
    "type": {
        isString: { errorMessage: "not string" },
        isIn: { 
            options: ["smoke", "flash", "molotov"],
            errorMessage: "not in: smoke, flash, molotov"
        },
        optional: { options: { nullable: true } }
    },
    "movement": {
        isString: { errorMessage: "not string" },
        isIn: {
            options: ["throw", "jumpthrow", "runjumpthrow"],
            errorMessage: "not in: throw, jumpthrow, runjumpthrow"
        },
        optional: { options: { nullable: true } }
    },
    "position": {
        isObject: { errorMessage: "not object" },
        optional: { options: { nullable: true } }
    },
    "position.lat": {
        isFloat: { errorMessage: "not float" },
        optional: { options: { nullable: true } }
    },
    "position.lng": {
        isFloat: { errorMessage: "not float" },
        optional: { options: { nullable: true } }
    },
    "position.floor": {
        isInt: {
            options: { min: 0, },
            errorMessage: "not int"
        },
        optional: { options: { nullable: true } }
    },
    "video.id": {
        isString: { errorMessage: "not string" },
        isLength: {
            options: { min: 11, max: 11 },
            errorMessage: "length isn't equal to 11"
        },
        optional: { options: { nullable: true } }
    },
    "video.time": {
        isInt: {
            options: { min: 0, },
            errorMessage: "not int"
        },
        optional: { options: { nullable: true } }
    },
    "tickrate.64": {
        isBoolean: { errorMessage: "not boolean" },
        optional: { options: { nullable: true } }
    },
    "tickrate.128": {
        isBoolean: { errorMessage: "not boolean" },
        optional: { options: { nullable: true } }
    },
    "description": {
        isString: { errorMessage: "not string" },
        isLength: { options: { max: 255 } },
        optional: { options: { nullable: true } }
    },
    "new_reaction": {
        isObject: { errorMessage: "not object" },
        optional: { options: { nullable: true } },
        custom: {
            options: (reaction, { req, location, path }) => {
                if (req.body.new_reaction.hyped === undefined)
                    throw 'new_reaction.hyped field missing';
                if (req.body.new_reaction.user === undefined)
                    throw 'new_reaction.user field missing';
                if (req.body.new_reaction.hidden === undefined)
                    throw 'new_reaction.hidden field missing';
                return reaction;
            }
        }
    },
"new_reaction.hyped": {
    isBoolean: { errorMessage: "not boolean" },
    optional: { options: { nullable: true } }
},
"new_reaction.user": {
    isString: { errorMessage: "not string" },
    optional: { options: { nullable: true } }
},
"new_reaction.hidden": {
    isBoolean: { errorMessage: "not boolean" },
    optional: { options: { nullable: true } }
},
};