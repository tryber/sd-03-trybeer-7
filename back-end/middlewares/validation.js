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
  registrySalesSchema: Joi.object({
    // Regex pattern para checar se a string é um número entre 1 e 1.000.000
    userId: Joi.string().pattern(/^[1-9][0-9]?$|^1000000$/)
      .required(),
    // validação do valor de compra conforme https://stackoverflow.com/questions/308122/simple-regular-expression-for-a-decimal-with-a-precision-of-2
    totalPrice: Joi.string().pattern(/^\d+(\.\d{1,2})?$/)
      .required(),
    deliveryAddress: Joi.string().min(3)
      .max(120)
      .required(),
    deliveryNumber: Joi.string().min(1)
      .max(6)
      .required(),
    products: Joi.array().items(Joi.object({
      id: Joi.string().required(),
      name: Joi.string(),
      price: Joi.string(),
      urlImage: Joi.string(),
      quantity: Joi.string().pattern(/^[1-9][0-9]?$|^1000000$/)
        .required(),
    }))
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
