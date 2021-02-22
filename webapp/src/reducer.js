// setup state
const initialState = [
  { id: 1, task: 'main', done: false },
  { id: 2, task: 'minum', done: true },
];

// reduce function
function add(state, action) {
  state.push({ id: action.payload.id, task: action.payload.task, done: false });
  return state;
}

function done(state, action) {
  const task = state.find((t) => t.id === action.payload);
  task.done = true;
  return state;
}

function undone(state, action) {
  const task = state.find((t) => t.id === action.payload);
  task.done = false;
  return state;
}

function loadTasks(state, action) {
  state = action.payload;
  return state;
}

module.exports = {
  initialState,
  add,
  done,
  undone,
  loadTasks,
};
