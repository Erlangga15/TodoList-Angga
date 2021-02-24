import './app.css';
import Vue from 'vue';
import { store$, addAction } from './store';

new Vue({
  el: '#todo-list',
  render(CreateElement) {
    const todoList = this.todos.map((todo) => {
      return CreateElement('tr', [
        CreateElement('td', [
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
              'far fa-check-circle check-done': todo.done,
              'far fa-check-circle': !todo.done,
            },
          }),
        ]),
        CreateElement('td', { class: 'trash trash-del' }, [
          CreateElement('span', {
            class: 'far fa-trash-alt',
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
        },
        [
          CreateElement('div', { domProps: { id: 'input-container' } }, [
            CreateElement('input', {
              domProps: {
                id: 'todo',
                type: 'text',
                placeholder: 'tambah task baru...',
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
      store$.dispatch(addAction(this.task));
      event.target.reset();
    },
  },
  mounted() {
    this.todos = store$.getState();
    store$.subscribe(() => {
      this.todos = store$.getState();
    });
  },
});
