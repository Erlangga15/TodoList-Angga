const { createLogger, format, transports } = require('winston');

const myFormat = format.printf(({timestamp, level, message}) => {
  return `${timestamp} ${level}: ${message}`;
})

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
}

module.exports = {
  createNodeLogger
}