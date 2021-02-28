const { createServer } = require('http');
const { connect } = require('./lib/orm');
const url = require('url');
const { stdout } = require('process');
const {
  listTask,
  addTask,
  doneTask,
  undoneTask,
  removeTask,
} = require('./todo.service');
const { TodoSchema } = require('./todo.model');

async function init() {
  try {
    console.log('connect to database');
    await connect([TodoSchema], {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'todolist',
    });
    console.log('database connected');
  } catch (err) {
    console.error('database connection failed');
    return;
  }
}

const server = createServer((req, res) => {
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
    return;
  }

  let method = req.method;
  let message = 'Data tidak ditemukan';
  let statusCode = 200;
  const uri = url.parse(req.url, true);
  const respond = () => {
    res.statusCode = statusCode;
    res.write(message);
    res.end();
  };
  try {
    switch (uri.pathname) {
      case '/list':
        if (method === 'GET') {
          listTask(req, res);
        } else {
          statusCode = 404;
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      case '/add':
        if (method === 'POST') {
          addTask(req, res);
        } else {
          statusCode = 404;
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      case '/done':
        if (method === 'PUT') {
          doneTask(req, res);
        } else {
          statusCode = 404;
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      case '/undone':
        if (method === 'PUT') {
          undoneTask(req, res);
        } else {
          statusCode = 404;
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      case '/remove':
        if (method === 'DELETE') {
          removeTask(req, res);
        } else {
          statusCode = 404;
          message = 'Method tidak tersedia';
          respond();
        }
        break;
      default:
        statusCode = 404;
        respond();
    }
  } catch (err) {
    statusCode = 500;
    message = 'Kesalahan server';
    respond();
  }
});

init();
const PORT = 8000;
server.listen(PORT, () => {
  stdout.write(`server listening on port ${PORT}\n`);
});
