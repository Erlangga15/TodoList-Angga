import './app.css';
import Vue from 'vue';
import { store$ } from './store';
import { listTaskClient } from './client-todo';
import { ListComponent } from './components/list-component';
import { InputComponent } from './components/input-component';

new Vue({
  el: '#todo-list',
  components: {
    'list-component': ListComponent,
    'input-component': InputComponent,
  },
  render(CreateElement) {
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
      CreateElement('input-component', { props: { task: this.task } }),
      CreateElement('list-component', { props: { todos: this.todos } }),
    ]);
  },
  data: {
    task: '',
    todos: [],
  },
  methods: {},
  mounted() {
    this.todos = store$.getState();
    store$.subscribe(() => {
      this.todos = store$.getState();
    });
    store$.dispatch(listTaskClient);
  },
});
