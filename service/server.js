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
      res.write(message || 'Method tidak tersedia');
      res.end();
    };
    try {
      switch (uri.pathname) {
        case '/list':
          if (method === 'GET') {
            listTask(req, res);
          } else {
            respond(404);
          }
          break;
        case '/add':
          if (method === 'POST') {
            addTask(req, res);
          } else {
            respond(404);
          }
          break;
        case '/done':
          if (method === 'PUT') {
            doneTask(req, res);
          } else {
            respond(404);
          }
          break;
        case '/undone':
          if (method === 'PUT') {
            undoneTask(req, res);
          } else {
            respond(404);
          }
          break;
        case '/remove':
          if (method === 'DELETE') {
            removeTask(req, res);
          } else {
            respond(404);
          }
          break;
        default:
          respond(404, 'Halaman tidak tersedia');
      }
    } catch (err) {
      respond(500, 'Kesalahan server');
    }
  });

  const PORT = config.server?.port;
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
