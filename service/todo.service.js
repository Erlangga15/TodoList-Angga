/** @module todoService */

const url = require('url');
const {
  list,
  add,
  done,
  undone,
  remove,
  ERROR_ADD_DATA_INVALID,
  ERROR_TODO_NOT_FOUND,
} = require('./todo');
const { ClientRequest, IncomingMessage, ServerResponse } = require('http');

/**
 * Service to get list of todos
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
const listTask = async (req, res) => {
  try {
    const todos = await list();
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(todos));
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.write(JSON.stringify(err.message || err));
    res.end();
    return;
  }
};

/**
 * Service to add a new todo
 * @param {ClientRequest} req
 * @param {ServerResponse} res
 */
const addTask = async (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', async () => {
    const body = JSON.parse(data);
    if (!body.task) {
      res.statusCode = 400;
      res.write(ERROR_ADD_DATA_INVALID);
      res.end();
      return;
    }
    try {
      const todo = await add(body);
      res.setHeader('content-type', 'application/json');
      res.statusCode = 200;
      res.write(JSON.stringify(todo));
      res.end();
    } catch (err) {
      res.statusCode = 500;
      res.write(JSON.stringify(err.message || err));
      res.end();
      return;
    }
  });
};

/**
 * service to set a todo to done by it's id
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
const doneTask = async (req, res) => {
  const uri = url.parse(req.url, true);
  const id = uri.query['id'];
  if (!id) {
    res.statusCode = 401;
    res.write('parameter id tidak ditemukan');
    res.end();
    return;
  }
  try {
    const todo = await done(parseInt(id, 10));
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    res.write(JSON.stringify(todo));
    res.end();
  } catch (err) {
    if (err === ERROR_TODO_NOT_FOUND) {
      res.statusCode = 404;
      res.write(err);
      res.end();
      return;
    }
    res.statusCode = 500;
    console.log(err);
    res.write(JSON.stringify(err.message || err));
    res.end();
    return;
  }
};

/**
 * Service to set a todo to undone by it's id
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
const undoneTask = async (req, res) => {
  const uri = url.parse(req.url, true);
  const id = uri.query['id'];
  if (!id) {
    res.statusCode = 401;
    res.write('parameter id tidak ditemukan');
    res.end();
    return;
  }
  try {
    const todo = await undone(parseInt(id, 10));
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    res.write(JSON.stringify(todo));
    res.end();
  } catch (err) {
    if (err === ERROR_TODO_NOT_FOUND) {
      res.statusCode = 404;
      res.write(err);
      res.end();
      return;
    }
    res.statusCode = 500;
    res.write(JSON.stringify(err.message || err));
    res.end();
    return;
  }
};

/**
 * Service to remove a todo by it's id
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
const removeTask = async (req, res) => {
  const uri = url.parse(req.url, true);
  const id = uri.query['id'];
  if (!id) {
    res.statusCode = 401;
    res.write('parameter id tidak ditemukan');
    res.end();
    return;
  }
  try {
    const todo = await remove(parseInt(id, 10));
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    res.write(JSON.stringify(todo));
    res.end();
  } catch (err) {
    if (err === ERROR_TODO_NOT_FOUND) {
      res.statusCode = 404;
      res.write(err);
      res.end();
      return;
    }
    res.statusCode = 500;
    res.write(JSON.stringify(err.message || err));
    res.end();
    return;
  }
};

module.exports = {
  listTask,
  addTask,
  doneTask,
  undoneTask,
  removeTask,
};
