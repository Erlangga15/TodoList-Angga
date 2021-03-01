const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, list, add, done, undone, remove } = require('./reducer');
const thunkMiddleware = require('redux-thunk');

const listAction = createAction('list');
const addAction = createAction('add');
const doneAction = createAction('done');
const undoneAction = createAction('undone');
const removeAction = createAction('del');

const todoReducer = createReducer(initialState, {
  [listAction]: list,
  [addAction]: add,
  [doneAction]: done,
  [undoneAction]: undone,
  [removeAction]: remove,
});

const store$ = configureStore({
  reducer: todoReducer,
  middleware: [thunkMiddleware.default],
});

module.exports = {
  store$,
  listAction,
  addAction,
  doneAction,
  undoneAction,
  removeAction,
};
