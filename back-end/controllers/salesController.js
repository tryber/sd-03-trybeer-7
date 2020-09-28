const { Router } = require('express');

const { salesService } = require('../services');
const middlewares = require('../middlewares');
const { generateError } = require('../utils');

const { schemas, validateSchema } = middlewares.validation;
const sales = Router();

sales
  .route('/')
  .post(validateSchema(schemas.salesbyUserSchema), async (req, res, next) => {
    try {
      const { userId } = req.body;
      const salesData = await salesService.saleByUser(userId);

      if (!salesData.length) throw new Error('Sales info not found');

      return res.status(200).json({ sales: [...salesData] });
    } catch (error) {
      next(generateError(404, error));
    }
  });

module.exports = sales;
