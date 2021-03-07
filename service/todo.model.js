/** @module todoSchema */

const { EntitySchema } = require('typeorm');

/**
 * Todo model
 */
class Todo {
  /**
   * Create new instance of todo model
   * @param {string} id id of a todo
   * @param {string} task task description
   * @param {boolean} done true when task are done
   */
  constructor(id, task, done) {
    this.id = id;
    this.task = task;
    this.done = done;
  }
}

/**
 * Entity schema of todo model
 */
const TodoSchema = new EntitySchema({
  name: 'Todo',
  target: Todo,
  tableName: 'todos',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    task: {
      type: 'varchar',
      length: 255,
    },
    done: {
      type: 'boolean',
      default: false,
    },
  },
});

module.exports = {
  Todo,
  TodoSchema,
};
