const Joi = require('joi');
const { generateError } = require('../utils');

const errorCode = 400;

const schemas = {
  userSchema: Joi.object({
    name: Joi.string().alphanum().min(5).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {
          allow: ['com', 'net'],
        },
      })
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          /* Minimum eight and maximum 10 characters, at least one uppercase letter,
           one lowercase letter, one number and one special character: */
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,10}$',
        ),
      )
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
      .pattern(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,10}$',
        ),
      )
      .required(),
  }),
};

const validateSchema = (schema) => async (req, _res, next) => {
  try {
    const requestValidation = await schema.validateAsync(req.body, {
      render: false,
    });

    if (requestValidation.error) {
      const { details } = requestValidation.error;
      const message = details.map((i) => i.message).join(',');
      throw new Error(message);
    }

    return next();
  } catch (error) {
    return next(generateError(errorCode, error));
  }
};

module.exports = {
  schemas,
  validateSchema,
};