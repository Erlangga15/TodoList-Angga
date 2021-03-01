const initialState = [
  { task: 'Main', done: false },
  { task: 'Makan', done: true },
];

const list = (state, action) => {
  state = action.payload;
  return state;
};

const add = (state, action) => {
  console.log(state[0]);
  state.push({ id: action.payload.id, task: action.payload.task, done: false });
  return state;
};

const done = (state, action) => {
  const task = state.find((t) => t.id === action.payload.id);
  task.done = true;
  return state;
};

const undone = (state, action) => {
  const task = state.find((t) => t.id === action.payload.id);
  task.done = false;
  return state;
};

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
