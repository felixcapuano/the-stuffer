const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
require('ajv-formats')(ajv);


exports.register = ajv.compile({
  type: 'object',
  properties: {
    'username': { type: 'string' },
    'email': { type: 'string', format: 'email' },
    'password': { type: 'string', minLength: 8}
  },
  required: ['username', 'email', 'password'],
  additionalProperties: false,
})

exports.login = ajv.compile({
  type: 'object',
  properties: {
    'email': { type: 'string', format: 'email'},
    'password': { type: 'string' }
  },
  required: ['email', 'password'],
  additionalProperties: false,
})