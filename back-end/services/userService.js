const model = require('../models');


const getUserByEmail = async (email) => {
  try {
    const user = await model.usersModel.findByEmail(email);

    return user ? {...user} : null;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUserByEmail,
}