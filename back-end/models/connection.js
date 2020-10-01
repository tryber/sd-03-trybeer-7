const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

let schema;
let connect;

const connection = async () => (
  schema ? Promise.resolve(schema)
    : mysqlx.getSession(config).then(async (session) => {
      schema = await session.getSchema('Trybeer');
      return schema;
    })
);

const sqlConnection = async (query) => (
  connect ? Promise.resolve(connect.execute()) : mysqlx.getSession(config).then(async (session) => {
    connect = await session.sql(query);
    return connect.execute();
  })
    .catch((error) => {
      throw new Error(error.message);
    })
);

module.exports = { connection, sqlConnection };
