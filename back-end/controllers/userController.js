const { Router } = require('express');
​
const middlewares = require('../middlewares');
​
const user = Router();
​
user.route('/login').post(middlewares.login);
​
module.exports = user;
