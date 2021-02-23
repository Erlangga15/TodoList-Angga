require('./app.css');
const {
  store$,
  addAction,
  doneAction,
  undoneAction,
  deleteAction,
} = require('./store');

const input = document.getElementById('todo');
const form = document.getElementById('todo-form');
const list = document.getElementById('list');

form.onsubmit = (event) => {
  event.preventDefault();
  const task = input.value;
  if (!task?.length) {
    return;
  }
  store$.dispatch(addAction(task));
  input.value = '';
};

store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});
const state = store$.getState();
render(state);

function render(state) {
  list.innerHTML = '';
  for (let i = 0; i < state.length; i++) {
    const todo = state[i];
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const label = document.createElement('span');
    const tdCheck = document.createElement('td');
    const tdTrash = document.createElement('td');
    const spanCheck = document.createElement('span');
    const spanTrash = document.createElement('span');

    label.innerHTML = todo.task;
    tdCheck.className = 'checkmark';
    tdTrash.className = 'trash trashDel';
    spanTrash.className = 'far fa-trash-alt';

    if (todo.done) {
      label.className = 'done';
      spanCheck.className = 'far fa-check-circle checkDone';
      spanCheck.onclick = function () {
        store$.dispatch(undoneAction(i));
      };
      spanTrash.onclick = function () {
        store$.dispatch(deleteAction(i));
      };
    } else {
      label.className = '';
      spanCheck.className = 'far fa-check-circle';
      spanCheck.onclick = function () {
        store$.dispatch(doneAction(i));
      };
      spanTrash.onclick = function () {
        store$.dispatch(deleteAction(i));
      };
    }
    tr.appendChild(td);
    tr.appendChild(tdCheck);
    tr.appendChild(tdTrash);
    td.appendChild(label);
    tdCheck.appendChild(spanCheck);
    tdTrash.appendChild(spanTrash);

    list.append(tr);
  }
}
