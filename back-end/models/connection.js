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

module.exports = () => (schema
  ? Promise.resolve(schema)
  : mysqlx.getSession(config).then(async (session) => {
    schema = await session.getSchema('Trybeer');
    return schema;
  }));