/** @module todo */

const { getConnection } = require('typeorm');
const { Todo } = require('./todo.model');

const ERROR_ADD_DATA_INVALID = 'Task is null';
const ERROR_ID_INVALID = 'id parameter not found';
const ERROR_TODO_NOT_FOUND = 'Task not found';

/**
 * Get list of todo
 * @returns {Promise<Todo[]>} list of task to do
 */
const list = () => {
  const todoRepo = getConnection().getRepository('Todo');
  return todoRepo.find();
};

/**
 * Add new todo
 * @param {TodoData} data todo detail
 * @returns {Promise<Todo>} new todo detail with id
 * @throws {string} when data not contain task property
 */
const add = async (data) => {
  if (!data.task) {
    throw ERROR_ADD_DATA_INVALID;
  }
  const todoRepo = getConnection().getRepository('Todo');
  const todo = new Todo(null, data.task, data.done);
  await todoRepo.save(todo);
  return todo;
};

/**
 * Set todo task to done
 * @param {string} id todo task id
 * @returns {Promise<Todo>} set todo task to done with id
 * @throws {string} when id are invalid
 * @throws {string} when todo not found in database
 */
const done = async (id) => {
  if (!id) {
    throw ERROR_ID_INVALID;
  }
  const todoRepo = getConnection().getRepository('Todo');
  let todo = await todoRepo.findOne(id);
  if (!todo) {
    throw ERROR_TODO_NOT_FOUND;
  }
  todo.done = true;
  await todoRepo.save(todo);
  return todo;
};

/**
 * Set todo task to undone
 * @param {string} id todo task id
 * @returns {Promise<Todo>} set todo task to undone with id
 * @throws {string} when id are invalid
 * @throws {string} when todo not found in database
 */
const undone = async (id) => {
  if (!id) {
    throw ERROR_ID_INVALID;
  }
  const todoRepo = getConnection().getRepository('Todo');
  let todo = await todoRepo.findOne(id);
  if (!todo) {
    throw ERROR_TODO_NOT_FOUND;
  }
  todo.done = false;
  await todoRepo.save(todo);
  return todo;
};

/**
 * Remove a todo by an id
 * @param {string} id todo id
 * @returns {Promise<Todo>} removed todo
 * @throws {string} when todo not found in database
 */
const remove = async (id) => {
  const todoRepo = getConnection().getRepository('Todo');
  const todo = await todoRepo.findOne(id);
  if (!todo) {
    throw ERROR_TODO_NOT_FOUND;
  }
  await todoRepo.delete(id);
  return todo;
};

/**
 * Truncate database for process development
 * @returns {boolean} true for truncate database
 */
const truncate = async () => {
  const entities = getConnection().entityMetadatas;

  for (const entity of entities) {
    const repository = await getConnection().getRepository(entity.name);
    try {
      await repository.clear();
    } catch (error) {
      return false;
    }
  }
  return true;
};

module.exports = {
  list,
  add,
  done,
  undone,
  remove,
  truncate,
  ERROR_ADD_DATA_INVALID,
  ERROR_TODO_NOT_FOUND,
};
