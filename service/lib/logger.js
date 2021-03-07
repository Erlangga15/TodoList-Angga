/** @module logger */
const { createLogger, format, transports } = require('winston');

/**
 * Formatting output logger
 * @returns {string} format log
 */
const myFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

/**
 * Configuration logger
 * @param {string} level additional [`logging levels`](https://github.com/winstonjs/winston#logging) in winston
 * @returns {logger} node logger
 */
const createNodeLogger = (level) => {
  const logger = createLogger({
    level: level || 'info',
    format: format.combine(format.timestamp(), myFormat),
    defaultMeta: { service: 'TodoService' },
    transports: [
      new transports.File({
        filename: 'error.log',
        level: 'error',
      }),
      new transports.Console({
        format: format.combine(format.timestamp(), myFormat),
      }),
    ],
  });
  return logger;
};

module.exports = {
  createNodeLogger,
};
