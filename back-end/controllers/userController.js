const { Router } = require('express');

const { userServices } = require('../services');
const middlewares = require('../middlewares');

const { schemas, validateSchema } = middlewares.validation;
const user = Router();

user
  .route('/')
  .post(validateSchema(schemas.userSchema), async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const userData = await userServices.addUser(name, email, password);
      return res.status(201).json({
        message: `User id.${userData.id} created at ${Date.now}`,
      });
    } catch (error) {
      next(error);
    }
  });

user
  .route('/login')
  .post(validateSchema(schemas.loginSchema), middlewares.login);

module.exports = user;
