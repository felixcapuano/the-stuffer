const Ajv = require('ajv');
const ajv = new Ajv({useDefaults: true}); // options can be passed, e.g. {allErrors: true}

const throwingSchema = require('./throwing-schema');
const landingSchema = require('./landing-schema');

const schema = {
  'throwing': {
    'create': ajv.compile(throwingSchema.create),
    'update': ajv.compile(throwingSchema.update),
    'search': ajv.compile(throwingSchema.search),
  },
  'landing': {
    'create': ajv.compile(landingSchema.create),
    'update': ajv.compile(landingSchema.update),
    'search': ajv.compile(landingSchema.search),
  }
}

module.exports = (_method) => {
  return (req, res, next) => {

    const validate = schema[req.params.collection]?.[_method];
    if (!validate) return res.sendStatus({ ok: false, message: '' });

    const valid = validate(req.body)
    if (!valid) return res.send({ ok: false, message: '', errors: validate.errors});

    next();
  }
}