const rc = require('rc');

const defaultConfig = {
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'todo',
  },
  server: {
    port: 8000,
  },
};

const config = rc('todo', defaultConfig);

module.exports = {
  config,
};
