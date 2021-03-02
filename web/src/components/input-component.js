import Vue from 'vue';
import { addTaskClient } from '../client-todo';
import { store$ } from '../store';

export const InputComponent = Vue.extend({
  props: ['task'],
  render(CreateElement) {
    return CreateElement(
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
              value: this.$props?.task,
            },
            on: {
              input: (event) => {
                this.$props.task = event.target.value;
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
    );
  },
  methods: {
    newTask(event) {
      event.preventDefault();
      if (!this.$props?.task?.length) {
        return;
      }
      store$.dispatch(addTaskClient(this.$props?.task));
      event.target.reset();
    },
  },
});
