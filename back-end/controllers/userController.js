const { Router } = require('express');

const { userServices } = require('../services');
const middlewares = require('../middlewares');

const { schemas, validateSchema } = middlewares.validation;
const user = Router();

user.route('/').post(
  validateSchema(schemas.userSchema),
  async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
      const userData = await userServices.addUser(name, email, password, role);

      if (!userData) throw new Error();

      return next();
    } catch (error) {
      next(error);
    }
  },
  middlewares.login,
);

user
  .route('/login')
  .post(validateSchema(schemas.loginSchema), middlewares.login);

module.exports = user;
