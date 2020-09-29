const { Router } = require('express');

const { salesService } = require('../services');
const middlewares = require('../middlewares');
const { generateError } = require('../utils');

const { schemas, validateSchema } = middlewares.validation;

const sales = Router();

sales
  .route('/search')
  .get(async (req, res, next) => {
    try {
      const { userId } = req.query;
      const salesData = await salesService.salesByUser(userId);

      if (!salesData.length) throw new Error('Sales info not found');

      return res.status(200).json({ sales: [...salesData] });
    } catch (error) {
      next(generateError(404, error));
    }
  });

sales.route('/register').post(validateSchema(schemas.registrySalesSchema), async (req, res, next) => {
  try {
    const { userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber, products } = req.body;

    const registerSales = await salesService.registerSales(userId,
      totalPrice,
      deliveryAddress,
      deliveryNumber, products);

    return res.status(200).json({ saleInfo: { ...registerSales } });
  } catch (error) {
    next(error);
  }
});

module.exports = sales;
