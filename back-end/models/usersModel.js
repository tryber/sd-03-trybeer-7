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

    const results = searchQuery.fetchAll();
    return results
      ? result.reduce((acc, [id, name, email, password, role]) => ({
          ...acc,
          id,
          name,
          email,
          password,
          role,
        }))
      : null;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findByEmail,
}
