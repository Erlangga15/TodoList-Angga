import Vue from 'vue';
import {
  doneTaskClient,
  undoneTaskClient,
  removeTaskClient,
} from '../client-todo';
import { store$ } from '../store';

export const ListComponent = Vue.extend({
  props: ['todos'],
  render(CreateElement) {
    const todoList = this.$props?.todos.map((todo) => {
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
    return CreateElement(
      'table',
      {
        domProps: {
          id: 'list',
        },
      },
      todoList
    );
  },
  methods: {
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
});
