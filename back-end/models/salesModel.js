const connection = require('./connection');

const getSalesByUser = async (userId) => {
  try {
    console.log('oi')
    const dBase = await connection();
    const searchQuery = await dBase
      .getTable('sales')
      .select([
        'id',
        'user_id',
        'total_price',
        'delivery_address',
        'delivery_number',
        'sale_date',
        'status',
      ])
      .where('user_id = :user_id')
      .bind('user_id', userId)
      .execute();

    const results = await searchQuery.fetchAll();
    const salesResults = results.map(
      ([
        id,
        userID,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        saleDate,
        status,
      ]) => ({
        id,
        userID,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        saleDate,
        status,
      }),
    );
    return salesResults;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getSalesByUser,
};
