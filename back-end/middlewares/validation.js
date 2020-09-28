const Joi = require('joi');
const { generateError } = require('../utils');

const errorCode = 400;

const schemas = {
  userSchema: Joi.object({
    name: Joi.string().min(12)
      .max(30)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'br'],
        },
      })
      .required(),
    password: Joi.string().min(6)
      .max(12)
      .required(),
    role: Joi.string().valid('administrator', 'client')
      .required(),
  }),
  loginSchema: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'br'],
        },
      })
      .required(),
    password: Joi.string().min(6)
      .max(12)
      .required(),
  }),
  userUpdateSchema: Joi.object({
    name: Joi.string().min(12)
      .max(30)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net', 'br'],
        },
      })
      .required(),
  }),
  // Regex: string que contenha número entre 1 - 100000
  salesbyUserSchema: Joi.object({
    userId: Joi.string()
      .pattern(/^[1-9][0-9]?$|^100000$/, { name: 'userId' })
      // mesagem de erro customizada
      .rule({ message: 'invalid data' })
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
