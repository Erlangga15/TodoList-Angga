const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, add, done, undone, loadTasks } = require('./reducer');
const thunkMiddleware = require('redux-thunk');

const addAction = createAction('add');
const doneAction = createAction('done');
const undoneAction = createAction('undone');
const loadTasksAction = createAction('loadTasks');

const todoReducer = createReducer(initialState, {
  [addAction]: add,
  [doneAction]: done,
  [undoneAction]: undone,
  [loadTasksAction]: loadTasks,
});

const store$ = configureStore({
  reducer: todoReducer,
  middleware: [thunkMiddleware.default],
});

module.exports = {
  store$,
  addAction,
  doneAction,
  undoneAction,
  loadTasksAction,
};
