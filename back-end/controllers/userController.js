const { Router } = require('express');

const { userServices } = require('../services');
const middlewares = require('../middlewares');
const { generateError } = require('../utils');

const user = Router();

user.route('/').post(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userData = await userServices.addUser(name, email, password);
    return res.status(201).json({
      message: `User id.${userData.id} created at ${Date.now}`,
    });
  } catch (error) {
    next(generateError(400, error));
  }
});

user.route('/login').post(middlewares.login);

module.exports = user;
