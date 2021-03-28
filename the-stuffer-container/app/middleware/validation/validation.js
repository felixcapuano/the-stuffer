const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const throwingSchema = require('./throwing-schema');

const schema = {
  'throwing': {
    'create': ajv.compile(throwingSchema.create),
    'update': ajv.compile(throwingSchema.update),
    'search': ajv.compile(throwingSchema.search),
  }
}

exports.validation = (_method) => {
  return (req, res, next) => {
    const validate = schema[req.params.collection]?.[_method];
    if (validate) {
      if (validate(req.body)) next();
      else res.status(400).send(validate.errors);
    }
    else res.sendStatus(404);
  }
}