const { salesModel } = require('../models');

const saleByUser = async (userId) => {
  try {
    const sales = await salesModel.getSalesByUser(userId);

    return [...sales];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  saleByUser,
};
