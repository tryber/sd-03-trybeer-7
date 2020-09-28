const { Router } = require('express');

const { salesService } = require('../services');
const { generateError } = require('../utils');

const sales = Router();

sales
  .route('/search')
  .get(async (req, res, next) => {
    try {
      const { userId } = req.query;
      console.log(req, 'oi');
      const salesData = await salesService.saleByUser(userId);

      if (!salesData.length) throw new Error('Sales info not found');

      return res.status(200).json({ sales: [...salesData] });
    } catch (error) {
      next(generateError(404, error));
    }
  });

module.exports = sales;
