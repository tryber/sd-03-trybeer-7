const Joi = require('joi');
const { generateError } = require('../utils');

const errorCode = 400;

const schemas = {
  userSchema: Joi.object({
    name: Joi.string().alphanum()
      .min(5)
      .max(30)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net'],
        },
      })
      .required(),
    password: Joi.string()
      .min(6)
      .max(12)
      .required(),
    role: Joi.string()
      .valid('administrator', 'client')
      .required(),
  }),
  loginSchema: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net'],
        },
      })
      .required(),
    password: Joi.string()
      .min(6)
      .max(12)
      .required(),
  }),
};

const validateSchema = (schema) => async (req, _res, next) => {
  try {
    await schema.validateAsync(req.body, {
      render: false,
    });

    return next();
  } catch (error) {
    return next(generateError(errorCode, error));
  }
};

module.exports = {
  schemas,
  validateSchema,
};
