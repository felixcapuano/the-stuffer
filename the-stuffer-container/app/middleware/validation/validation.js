const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const throwingSchema = require('./throwing-schema');

const schema = {
    "throwing": {
        "create": ajv.compile(throwingSchema.create),
        "update": ajv.compile(throwingSchema.update),
        //"search": ajv.compile(throwingSchema.search),
    }
}

exports.validation = (req, res, next) => {
    const validate = schema[req.params.collection][req.params.method];
    if (validate) {
        const valid = validate(req.body);
        if (valid) next()
        else res.status(400).send(validate.errors);
    }
    else next();
}