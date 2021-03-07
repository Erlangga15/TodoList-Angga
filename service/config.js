const rc = require('rc');

const defaultConfig = {
  database: {
    type: 'postgres',
    host: 'tai.db.elephantsql.com',
    port: 5432,
    username: 'pxuldfkr',
    password: 'cTpBmg0ICIB-5sqnX9ofRV9t7YwOyZPl',
    database: 'pxuldfkr',
  },
  server: {
    port: 8000,
  },
};

const config = rc('todo', defaultConfig);

module.exports = {
  config,
};
