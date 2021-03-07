const { createServer } = require('http');
const url = require('url');
const { stdout } = require('process');
const {
  listTask,
  addTask,
  doneTask,
  undoneTask,
  removeTask,
} = require('./todo.service');
const { config } = require('./config');
const { createNodeLogger } = require('./lib/logger');
const { createTracer } = require('./lib/tracer');

const logger = createNodeLogger();
const tracer = createTracer('todolist-service');
let server;

/**
 * Cors allowed
 */
const cors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return true;
  }
};

/**
 * Run server
 */
const run = () => {
  server = createServer((req, res) => {
    let method = req.method;
    const uri = url.parse(req.url, true);

    const aborted = cors(req, res);
    if (aborted) {
      return;
    }
    const respond = (statusCode, message) => {
      res.statusCode = statusCode || 200;
      res.write(message || 'Method not available');
      res.end();
    };
    try {
      switch (uri.pathname) {
        case '/list':
          if (method === 'GET') {
            listTask(req, res, tracer);
          } else {
            respond(404);
            logger.error('Page not available');
          }
          break;
        case '/add':
          if (method === 'POST') {
            addTask(req, res, tracer);
          } else {
            respond(404);
            logger.error('Page not available');
          }
          break;
        case '/done':
          if (method === 'PUT') {
            doneTask(req, res, tracer);
          } else {
            respond(404);
            logger.error('Page not available');
          }
          break;
        case '/undone':
          if (method === 'PUT') {
            undoneTask(req, res, tracer);
          } else {
            respond(404);
            logger.error('Page not available');
          }
          break;
        case '/remove':
          if (method === 'DELETE') {
            removeTask(req, res, tracer);
          } else {
            respond(404);
            logger.error('Page not available');
          }
          break;
        default:
          respond(404, 'Page not available');
          logger.error('Page not available');
      }
    } catch (err) {
      respond(500, 'Internal Server Error');
      logger.error('Internal Server Error');
    }
  });

  const PORT = process.env.PORT || config.server.port;
  server.listen(PORT, () => {
    stdout.write(`server listening on port ${PORT}\n`);
  });
};

const stop = () => {
  if (server) {
    server.close();
  }
};

module.exports = {
  run,
  cors,
  stop,
};
