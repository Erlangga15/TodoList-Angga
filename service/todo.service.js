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
const { createNodeLogger } = require('./lib/logger');

const logger = createNodeLogger();

/**
 * Service to get list of todos
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {createTracer} tracer
 */
const listTask = async (req, res, tracer) => {
  const parentSpan = tracer.startSpan('list_task');
  const span = tracer.startSpan('get_task_data', { childOf: parentSpan });

  try {
    const todos = await list();
    span.finish();
    parentSpan.finish();
    res.setHeader('content-type', 'application/json');
    res.write(JSON.stringify(todos));
    res.end();
  } catch (err) {
    span.setTag('error', true);
    span.log({ event: 'error_get_data', message: err });
    span.finish();
    parentSpan.finish();
    logger.error('Internal Server Error: listTask');
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
 * @param {createTracer} tracer
 */
const addTask = async (req, res, tracer) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', async () => {
    const parentSpan = tracer.startSpan('add_task');
    const span = tracer.startSpan('parsing_body', { childOf: parentSpan });

    const body = JSON.parse(data);
    if (!body.task) {
      logger.error('Task is null: addTask');
      span.setTag('error', true);
      span.log({
        event: 'error parsing body',
        message: 'task parameter not found',
      });
      res.statusCode = 400;
      res.write(ERROR_ADD_DATA_INVALID);
      res.end();
      span.finish();
      parentSpan.finish();
      return;
    }
    span.finish();
    const span2 = tracer.startSpan('write_todo_on_db', {
      childOf: parentSpan,
    });
    try {
      const todo = await add(body);
      span2.finish();
      parentSpan.finish();
      res.setHeader('content-type', 'application/json');
      res.statusCode = 200;
      res.write(JSON.stringify(todo));
      res.end();
    } catch (err) {
      logger.error('Internal Server Error: addTask');
      span.setTag('error', true);
      span.log({
        event: 'error write to database',
        message: err.message,
      });
      span2.finish();
      parentSpan.finish();
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
 * @param {createTracer} tracer
 */
const doneTask = async (req, res, tracer) => {
  const uri = url.parse(req.url, true);
  const id = uri.query['id'];
  const parentSpan = tracer.startSpan('done_task');
  const span = tracer.startSpan('get_id', { childOf: parentSpan });

  if (!id) {
    logger.error('id parameter not found: doneTask');
    span.setTag('error', true);
    span.log({
      event: 'error get id',
      message: 'id parameter not found',
    });
    span.finish();
    parentSpan.finish();
    res.statusCode = 401;
    res.write('id parameter not found');
    res.end();
    return;
  }
  span.finish();
  const span2 = tracer.startSpan('set_task_to_done', {
    childOf: parentSpan,
  });
  try {
    const todo = await done(parseInt(id, 10));
    span2.finish();
    parentSpan.finish();
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    res.write(JSON.stringify(todo));
    res.end();
  } catch (err) {
    if (err === ERROR_TODO_NOT_FOUND) {
      logger.error('Task not found: doneTask');
      span2.setTag('error', true);
      span2.log({
        event: 'error set task to done',
        message: err,
      });
      span2.finish();
      parentSpan.finish();
      res.statusCode = 404;
      res.write(err);
      res.end();
      return;
    }
    logger.error('Internal Server Error: doneTask');
    span2.setTag('error', true);
    span2.log({
      event: 'internal server error',
      message: err,
    });
    span2.finish();
    parentSpan.finish();
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
 * @param {createTracer} tracer
 */
const undoneTask = async (req, res, tracer) => {
  const uri = url.parse(req.url, true);
  const id = uri.query['id'];
  const parentSpan = tracer.startSpan('undone_task');
  const span = tracer.startSpan('get_id', { childOf: parentSpan });

  if (!id) {
    logger.error('id parameter not found: undoneTask');
    span.setTag('error', true);
    span.log({
      event: 'error get id',
      message: 'id parameter not found',
    });
    span.finish();
    parentSpan.finish();
    res.statusCode = 401;
    res.write('id parameter not found');
    res.end();
    return;
  }
  span.finish();
  const span2 = tracer.startSpan('set_task_to_undone', {
    childOf: parentSpan,
  });
  try {
    const todo = await undone(parseInt(id, 10));
    span2.finish();
    parentSpan.finish();
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    res.write(JSON.stringify(todo));
    res.end();
  } catch (err) {
    if (err === ERROR_TODO_NOT_FOUND) {
      logger.error('Task not found: undoneTask');
      span2.setTag('error', true);
      span2.log({
        event: 'error set task to undone',
        message: err,
      });
      span2.finish();
      parentSpan.finish();
      res.statusCode = 404;
      res.write(err);
      res.end();
      return;
    }
    logger.error('Internal Server Error: undoneTask');
    span2.setTag('error', true);
    span2.log({
      event: 'internal server error',
      message: err,
    });
    span2.finish();
    parentSpan.finish();
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
 * @param {createTracer} tracer
 */
const removeTask = async (req, res, tracer) => {
  const uri = url.parse(req.url, true);
  const id = uri.query['id'];
  const parentSpan = tracer.startSpan('remove_task');
  const span = tracer.startSpan('get_id', { childOf: parentSpan });

  if (!id) {
    logger.error('id parameter not found: removeTask');
    span.setTag('error', true);
    span.log({
      event: 'error get id',
      message: 'id parameter not found',
    });
    span.finish();
    parentSpan.finish();
    res.statusCode = 401;
    res.write('id parameter not found');
    res.end();
    return;
  }
  span.finish();
  const span2 = tracer.startSpan('remove_task', {
    childOf: parentSpan,
  });
  try {
    const todo = await remove(parseInt(id, 10));
    span2.finish();
    parentSpan.finish();
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    res.write(JSON.stringify(todo));
    res.end();
  } catch (err) {
    if (err === ERROR_TODO_NOT_FOUND) {
      logger.error('Task not found: removeTask');
      span2.setTag('error', true);
      span2.log({
        event: 'error remove task',
        message: err,
      });
      span2.finish();
      parentSpan.finish();
      res.statusCode = 404;
      res.write(err);
      res.end();
      return;
    }
    logger.error('Internal Server Error: removeTask');
    span2.setTag('error', true);
    span2.log({
      event: 'internal server error',
      message: err,
    });
    span2.finish();
    parentSpan.finish();
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
