const { add, done, undone, del } = require('../reducer');

const initialState = [
  { task: 'Main', done: false },
  { task: 'Minum', done: true },
];

describe('Todo Webapp', () => {
  beforeEach(() => {
    while (initialState.length) {
      initialState.pop();
    }
    initialState.push(
      { task: 'Main', done: false },
      { task: 'Minum', done: true }
    );
  });

  test('Menambah tugas baru', () => {
    const action = {
      type: 'add',
      payload: 'Belajar',
    };
    add(initialState, action);
    expect(initialState).toHaveLength(3);
    expect(initialState[2].task).toBe('Belajar');
  });
  test('Menandai tugas selesai', () => {
    const action = {
      type: 'done',
      payload: {
        task: 'Main',
        done: true,
      },
    };
    done(initialState, action);
    expect(initialState[0].done).toBeTruthy();
  });
  test('Menandai tugas belum selesai', () => {
    const action = {
      type: 'done',
      payload: {
        task: 'Minum',
        done: false,
      },
    };
    undone(initialState, action);
    expect(initialState[1].done).toBeFalsy();
  });
  test('Menghapus tugas', () => {
    const action = {
      type: 'done',
      payload: {
        task: 'Minum',
        done: false,
      },
    };
    del(initialState, action);
    expect(initialState).toHaveLength(1);
  });
});
