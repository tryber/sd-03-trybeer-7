const connection = require('./connection');

const findByEmail = async (userEmail) => {
  try {
    const dBase = await connection();
    const searchQuery = await dBase
      .getTable('users')
      .select(['id', 'name', 'email', 'password', 'role'])
      .where('email = :email')
      .bind('email', userEmail)
      .execute();

    const results = await searchQuery.fetchAll();
    const userResult = results.reduce(
      (acc, [id, name, email, password, role]) => ({
        ...acc,
        id,
        name,
        email,
        password,
        role,
      }),
      {},
    );
    return userResult;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findByEmail,
};