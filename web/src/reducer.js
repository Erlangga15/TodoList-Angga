/** @module reducer */

const initialState = [];

/**
 * Load task list
 * @param state previous state
 * @param action action
 */
const list = (state, action) => {
  state = action.payload;
  return state;
};

/**
 * Add task to todo list
 * @param state previous state
 * @param action action
 */
const add = (state, action) => {
  console.log(state[0]);
  state.push({ id: action.payload.id, task: action.payload.task, done: false });
  return state;
};

/**
 * Set task to done
 * @param state previous state
 * @param action action
 */
const done = (state, action) => {
  const task = state.find((t) => t.id === action.payload.id);
  task.done = true;
  return state;
};

/**
 * Set task to undone
 * @param state previous state
 * @param action action
 */
const undone = (state, action) => {
  const task = state.find((t) => t.id === action.payload.id);
  task.done = false;
  return state;
};

/**
 * Remove task
 * @param state previous state
 * @param action action
 */
const remove = (state, action) => {
  const task = state.findIndex((t) => t.id === action.payload.id);
  state.splice(task, 1);
  return state;
};

module.exports = {
  initialState,
  list,
  add,
  done,
  undone,
  remove,
};
