import './app.css';
const { store$ } = require('./store');
const {
  addTaskAsync,
  loadTasksAsync,
  doneTaskAsync,
  undoneTaskAsync,
} = require('./todo-client');

// view
const input = document.getElementById('todo');
const form = document.getElementById('todo-form');
const list = document.getElementById('todo-list');

form.onsubmit = (event) => {
  event.preventDefault();
  const task = input.value;
  if (!task?.length) {
    return;
  }
  // dispatch action add
  store$.dispatch(addTaskAsync(task));
  input.value = '';
};

// presentation layer
store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});
const state = store$.getState();
render(state);

store$.dispatch(loadTasksAsync);

function render(state) {
  list.innerHTML = '';
  for (let i = 0; i < state.length; i++) {
    const todo = state[i];
    const li = document.createElement('li');
    li.textContent = todo.task;
    if (todo.done) {
      li.className = 'todo-done';
      li.onclick = function () {
        // dispatch action done
        store$.dispatch(undoneTaskAsync(todo.id));
      };
    } else {
      li.className = '';
      li.onclick = function () {
        // dispatch action done
        store$.dispatch(doneTaskAsync(todo.id));
      };
    }
    list.append(li);
  }
}
