const { createConnection } = require('typeorm');

function connect(entities, config, test) {
  return createConnection({
    ...config,
    synchronize: true,
    dropSchema: test,
    timezone: 'Asia/Jakarta',
    entities,
  });
}

module.exports = {
  connect,
};
