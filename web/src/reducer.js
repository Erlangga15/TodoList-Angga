const initialState = [
  { task: 'main', done: false },
  { task: 'makan', done: true },
];

function add(state, action) {
  state.push({ task: action.payload, done: false });
  return state;
}

function done(state, action) {
  state[action.payload].done = true;
  return state;
}

function undone(state, action) {
  state[action.payload].done = false;
  return state;
}
function del(state, action) {
  state.pop();
  return state;
}

module.exports = {
  initialState,
  add,
  done,
  undone,
  del,
};
