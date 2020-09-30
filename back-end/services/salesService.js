const { salesModel } = require('../models');

const registerSales = async (userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber, products = []) => {
  try {
    // registra evento de venda
    const registrySales = await salesModel.addSale(userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber);

    // registro dos produtos por evento de venda
    const registryProductsBySale = await Promise
      .all(products.map((product) => {
        const { id, quantity } = product;
        return salesModel.addSalesProducts(registrySales.saleID, id, quantity);
      }));
    const itemCount = await registryProductsBySale.reduce((acc, item) => acc + item, 0);
    return { ...registrySales, soldItems: itemCount };
  } catch (error) {
    throw new Error(error.message);
  }
};

const salesById = async (saleID) => {
  try {
    const sales = await salesModel.getSalesByID(saleID);

    return { ...sales };
  } catch (error) {
    throw new Error(error.message);
  }
};

const salesByUser = async (userId) => {
  try {
    const sales = await salesModel.getSalesByUser(userId);

    return [...sales];
  } catch (error) {
    throw new Error(error.message);
  }
};

const allSales = async () => {
  try {
    const sales = await salesModel.getAllSales();

    return [...sales];
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  allSales,
  salesById,
  salesByUser,
  registerSales,
};
