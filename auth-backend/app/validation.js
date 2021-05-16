const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
require('ajv-formats')(ajv);

exports.register = ajv.compile({
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 1,
      maxLength: 30,
    },
    email: {
      type: 'string',
      format: 'email',
      minLength: 1,
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 100,
    },
  },
  required: ['username', 'email', 'password'],
  additionalProperties: false,
});

exports.login = ajv.compile({
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
  required: ['email', 'password'],
  additionalProperties: false,
});

exports.emailToken = ajv.compile({
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
  },
  required: ['token'],
  additionalProperties: false,
});
