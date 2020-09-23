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
    throw new Error(error.message);
  }
};

const createUser = async (name, email, password, role) => {
  try {
    const dBase = await connection();
    const updateQuery = await dBase
      .getTable('users')
      .insert(['name', 'email', 'password', 'role'])
      .values(name, email, password, role)
      .execute();
    return { userID: updateQuery.getAutoIncrementValue() };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  findByEmail,
  createUser,
};
