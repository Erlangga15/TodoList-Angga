const orm = require('./lib/orm');
const { TodoSchema } = require('./todo.model');
const { config } = require('./config');
const server = require('./server');
const { createNodeLogger } = require('./lib/logger');

const logger = createNodeLogger();

/**
 * Intiate database connection
 */
const init = async () => {
  try {
    logger.info('connect to database');
    await orm.connect([TodoSchema], {
      type: config.database?.type,
      host: config.database?.host,
      port: config.database?.port,
      username: config.database?.username,
      password: config.database?.password,
      database: config.database?.database,
    });
    logger.info('database connected');
  } catch (err) {
    logger.error('database connection failed');
    return;
  }
};

const main = async () => {
  await init();
  server.run();
};

main();
