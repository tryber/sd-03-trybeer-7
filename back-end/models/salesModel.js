const { connection, sqlConnection } = require('./connection');

const addSale = async (
  userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  status = 'Pendente',
) => {
  try {
    // inserindo venda usando datetime do banco de dados via função NOW()
    const insertQuery = `INSERT INTO Trybeer.sales (user_id, total_price, delivery_address, delivery_number, sale_date, status) VALUES(${userId}, '${totalPrice}', '${deliveryAddress}', '${deliveryNumber}', NOW(), '${status}')`;

    const insertSale = await sqlConnection(insertQuery);
    // Obtendo ID de venda cadastrada
    const saleID = await insertSale.getAutoIncrementValue();

    return { saleID };
  } catch (error) {
    throw new Error(error.message);
  }
};

const addSalesProducts = async (saleID, id, quantity) => {
  try {
    const dBase = await connection();
    const insertProductsBySale = await dBase.getTable('sales_products').insert(['sale_id', 'product_id', 'quantity'])
      .values(saleID, id, quantity)
      .execute();
    const productsBySalesQt = await insertProductsBySale.getAffectedItemsCount();

    return productsBySalesQt;
  } catch (error) {
    console.error(error, 'oi');
    throw new Error(error.message);
  }
};

const getSalesDetailsByID = async (saleId) => {
  try {
    // em desenvolvimento
    const joinQuery = `SELECT sproducts.product_id, sproducts.quantity, (SELECT * FROM Trybeer.products AS products WHERE products_details.id = sproducts.product_id) AS products_details FROM Trybeer.sales_products AS sproducts INNER JOIN Trybeer.sales AS sales ON sproducts.sale_id = sales.id AND sales.id = ${saleId} ORDER BY sales.id`;

    const searchQuery = await sqlConnection(joinQuery);

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

const getAllSales = async () => {
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
        saleDate: new Date(saleDate).toISOString(),
        status,
      }),
    );
    return salesResults;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllSales,
  getSalesDetailsByID,
  getSalesByUser,
  addSale,
  addSalesProducts,
};
