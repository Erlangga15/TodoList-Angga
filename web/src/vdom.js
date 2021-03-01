import './app.css';
import Vue from 'vue';
import { store$ } from './store';
import {
  listTaskClient,
  addTaskClient,
  doneTaskClient,
  undoneTaskClient,
  removeTaskClient,
} from './client-todo';

new Vue({
  el: '#todo-list',
  render(CreateElement) {
    const todoList = this.todos.map((todo) => {
      return CreateElement('tr', [
        CreateElement('td', { class: 'task' }, [
          CreateElement(
            'span',
            {
              class: {
                'todo-done': todo.done,
              },
            },
            todo.task
          ),
        ]),
        CreateElement('td', { class: 'checkmark' }, [
          CreateElement('span', {
            class: {
              'far fa-check-circle check-done': todo?.done,
              'far fa-check-circle': !todo?.done,
            },
            on: {
              click: () => {
                this.toogleDone(todo);
              },
            },
          }),
        ]),
        CreateElement('td', { class: 'trash trash-del' }, [
          CreateElement('span', {
            class: 'far fa-trash-alt',
            on: {
              click: () => {
                this.deleteTask(todo);
              },
            },
          }),
        ]),
      ]);
    });

    return CreateElement('div', { domProps: { id: 'form' } }, [
      CreateElement('div', { class: 'heading' }, [
        CreateElement('img', {
          class: 'heading__img',
          domProps: {
            src:
              'https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg',
          },
        }),
        CreateElement('h1', { class: 'heading__title' }, 'To-Do List'),
      ]),
      CreateElement(
        'form',
        {
          domProps: {
            id: 'todo-form',
          },
          on: {
            submit: this.newTask,
          },
        },
        [
          CreateElement('div', { domProps: { id: 'input-container' } }, [
            CreateElement('input', {
              domProps: {
                id: 'todo',
                type: 'text',
                placeholder: 'tambah task baru...',
                value: this.task,
              },
              on: {
                input: (event) => {
                  this.task = event.target.value;
                },
              },
            }),
            CreateElement(
              'button',
              {
                domProps: {
                  id: 'add',
                  type: 'submit',
                },
              },
              'Tambah'
            ),
          ]),
        ]
      ),
      CreateElement(
        'table',
        {
          domProps: {
            id: 'list',
          },
        },
        todoList
      ),
    ]);
  },
  data: {
    task: '',
    todos: [],
  },
  methods: {
    newTask(event) {
      event.preventDefault();
      if (!this.task?.length) {
        return;
      }
      store$.dispatch(addTaskClient(this.task));
      event.target.reset();
    },
    toogleDone(todo) {
      if (todo?.done) {
        store$.dispatch(undoneTaskClient(todo?.id));
      } else {
        store$.dispatch(doneTaskClient(todo?.id));
      }
    },
    deleteTask(todo) {
      store$.dispatch(removeTaskClient(todo?.id));
    },
  },
  mounted() {
    this.todos = store$.getState();
    store$.subscribe(() => {
      this.todos = store$.getState();
    });
    store$.dispatch(listTaskClient);
  },
});
