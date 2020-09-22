const connection = require('./connection');

const findByEmail = async (email) => {
  try {
    const dBase = await connection();
    const searchQuery = await dBase
      .getTable('users')
      .select(['id', 'name', 'email', 'password', 'role'])
      .where('email = :email')
      .bind('email', email)
      .execute();

    const results = await searchQuery.fetchAll()[0];
    console.log(results);
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
    console.log(userResult);
    return userResult;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findByEmail,
};
