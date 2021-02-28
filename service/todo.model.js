const { EntitySchema } = require('typeorm');

class Todo {
  constructor(id, task, done) {
    this.id = id;
    this.task = task;
    this.done = done;
  }
}

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
