const Ajv = require('ajv');
const ajv = new Ajv();

exports.register = ajv.compile({
  type: 'object',
  properties: {
    'username': { type: 'string' },
    'email': { type: 'string' },
    'password': { type: 'string' }
  },
  required: ['username', 'email', 'password'],
  additionalProperties: false,
})

exports.login = ajv.compile({
  type: 'object',
  properties: {
    'email': { type: 'string' },
    'password': { type: 'string' }
  },
  required: ['email', 'password'],
  additionalProperties: false,
})