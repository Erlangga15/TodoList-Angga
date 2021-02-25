const initialState = [
  { task: 'main', done: false },
  { task: 'makan', done: true },
];

function add(state, action) {
  console.log(state[0]);
  state.push({ task: action.payload, done: false });
  return state;
}

function done(state, action) {
  const task = state.find((t) => t.task === action?.payload.task);
  task.done = true;
  return state;
}

function undone(state, action) {
  const task = state.find((t) => t.task === action?.payload.task);
  task.done = false;
  return state;
}

function del(state, action) {
  const task = state.findIndex((t) => t.task === action?.payload.task);
  state.splice(task, 1);
  return state;
}

module.exports = {
  initialState,
  add,
  done,
  undone,
  del,
};
