const orm = require('./lib/orm');
const { TodoSchema } = require('./todo.model');
const { config } = require('./config');
const server = require('./server');

/**
 * Intiate database connection
 */
const init = async () => {
  try {
    console.log('connect to database');
    await orm.connect([TodoSchema], {
      type: config.database?.type,
      host: config.database?.host,
      port: config.database?.port,
      username: config.database?.username,
      password: config.database?.password,
      database: config.database?.database,
    });
    console.log('database connected');
  } catch (err) {
    console.error('database connection failed');
    return;
  }
};

const main = async () => {
  await init();
  server.run();
};

main();
