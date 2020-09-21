const connection = require('./connection');

const getAllProducts = async () => {
  try {
    const dBase = await connection();
    const query = await dBase
      .getTable('products')
      .select(['name', 'price'])
      .execute();
    const results = await query.fetchAll();
    return results
      ? results.map(([name, price]) => ({
        name,
        price,
      }))
      : null;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getAllProducts };
