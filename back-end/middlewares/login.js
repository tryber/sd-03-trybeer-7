const jwt = require('jsonwebtoken');
require('dotenv/config');
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
    console.log(userData);
    const token = jwt.sign({ data: userData }, SECRET, tokenConfig);
    console.log(`token: ${token}`)
    console.log(jwt.verify(token, SECRET).data);
    return res.status(200).json({ token });
  }
    catch (error) {
      next(generateError(errorCode, error));
    }
  };