const jwt = require('jsonwebtoken');

const { tokenConfig, SECRET } = require('./config');
const { userServices } = require('../services');
const { generateError } = require('../utils');

const errorCode = 401;

module.exports = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await userServices.getUserByEmail(body.email);
    // alterar mensagem de erro
    if (!user) throw new Error('user not found');
    if (body.password !== user.password) throw new Error('wrong user or password');

    const { password, ...userData } = user;

    const token = jwt.sign({ data: userData }, SECRET, tokenConfig);

    return res.status(200).json({ token });
  } catch (error) {
    next(generateError(errorCode, error));
  }
};
