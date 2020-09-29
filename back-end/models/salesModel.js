const connection = require('./connection');

const addSale = async (
  userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  status = 'Pendente',
) => {
  try {
    // inserindo venda usando datetime do banco de dados via função NOW()
    const insertQuery = `INSERT INTO Trybeer.sales (user_id, total_price, delivery_address, deliver_number, sale_date, status).values(${userId}, ${totalPrice}, ${deliveryAddress}, ${deliveryNumber}, NOW(), ${status})`;

    const dBase = await connection();
    const insertSale = await dBase.getTable('sales').sql(insertQuery)
      .execute();
    // Obtendo ID de venda cadastrada
    const saleID = await insertSale.getAutoIncrementValue();
    return { saleID };
  } catch (error) {
    throw new Error(error.message);
  }
};

const addSalesProducts = async (saleID, product = {}) => {
  try {
    const { productId, quantity } = product;

    const dBase = await connection();
    const insertProductsBySale = await dBase.getTable('sales_products').insert(['sales_id', 'product_id', 'quantity'])
      .values(saleID, productId, quantity)
      .execute();

    return { productBySaleID: insertProductsBySale.getAutoIncrementValue() };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSalesDetailsByID = async (saleId) => {
  try {
    const joinQuery = `SELECT sproducts.product_id, sproducts.quantity FROM Trybeer.sales_products AS sproducts LEFT JOIN Trybeer.sales AS sales ON sproducts.sale_id = sales.id AND sales.id = ${saleId} ORDER BY sales.id`;
    const dBase = await connection();
    const searchQuery = await dBase
      .getTable('sales')
      .sql(joinQuery)
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

const getSalesByUser = async (userId) => {
  try {
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
  getSalesDetailsByID,
  getSalesByUser,
  addSale,
  addSalesProducts,
};
