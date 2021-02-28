const { getConnection } = require('typeorm');
const { Todo } = require('./todo.model');

const ERROR_ADD_DATA_INVALID = 'data tugas tidak valid';
const ERROR_ID_INVALID = 'id tugas tidak valid';
const ERROR_TODO_NOT_FOUND = 'tugas tidak ditemukan';

function list() {
  const todoRepo = getConnection().getRepository('Todo');
  return todoRepo.find();
}

async function add(data) {
  if (!data.task) {
    throw ERROR_ADD_DATA_INVALID;
  }
  const todoRepo = getConnection().getRepository('Todo');
  const todo = new Todo(null, data.task, data.done);
  await todoRepo.save(todo);
  return todo;
}

async function done(id) {
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
}

async function undone(id) {
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
}

async function remove(id) {
  const todoRepo = getConnection().getRepository('Todo');
  const todo = await todoRepo.findOne(id);
  if (!todo) {
    throw ERROR_TODO_NOT_FOUND;
  }
  await todoRepo.delete(id);
  return todo;
}

async function truncate() {
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
}

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
