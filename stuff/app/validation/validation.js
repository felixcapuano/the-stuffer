const Ajv = require('ajv');
const ajv = new Ajv({useDefaults: true, allErrors: true});

const { landingIdExist } = require('../mongo/core');
const throwingSchema = require('./throwing-schema');
const landingSchema = require('./landing-schema');

ajv.addKeyword({
  keyword: 'isLandingIdExist',
  async: true,
  type: 'string',
  validate: async (schema, id, type, { parentData }) => {
    if (parentData.collection === 'throwing') {
      const idExist = await landingIdExist(id);
      return idExist;
    }
  }
});

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
  return async (req, res, next) => {

    const validate = schema[req.body.collection]?.[_method];
    if (!validate) return res.sendStatus(404);

    try {
      const data = await validate(req.body);
    } catch (error) {
      console.erros(error.errors);
      return res.send({ ok: false, message: 'Bad format', errors: error.errors});
    }
    next();
  }
}