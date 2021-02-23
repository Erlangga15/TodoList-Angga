const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, add, done, undone, del } = require('./reducer');

const addAction = createAction('add');
const doneAction = createAction('done');
const undoneAction = createAction('undone');
const deleteAction = createAction('del');

const todoReducer = createReducer(initialState, {
  [addAction]: add,
  [doneAction]: done,
  [undoneAction]: undone,
  [deleteAction]: del,
});

const store$ = configureStore({
  reducer: todoReducer,
});

module.exports = {
  store$,
  addAction,
  doneAction,
  undoneAction,
  deleteAction,
};
