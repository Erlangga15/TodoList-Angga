/** @module orm */
const { createConnection } = require('typeorm');
const { EntitySchema } = require('typeorm');

/**
 * Connect to database
 * @deprecated
 * @param {EntitySchema[]} entities model entitites schemas
 * @param {*} config additional [`typeorm`](https://typeorm.io) connection config
 *
 * @example
 * Initiate database connection
 * async function init() {
 *  await connect([MySchema], {
 *    type: 'postgres',
 *    host: 'localhost',
 *    port: 5432,
 *    username: 'postgres',
 *    password: 'postgres',
 *    database:
 *    'sanbercode1',
 *  });
 * }
 */
function connect(entities, config) {
  return createConnection({
    ...config,
    synchronize: true,
    timezone: 'Asia/Jakarta',
    entities,
  });
}

module.exports = {
  connect,
};
