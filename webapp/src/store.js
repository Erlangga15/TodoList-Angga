const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, add, done, undone } = require('./reducer');

const addAction = createAction('add');
const doneAction = createAction('done');
const undoneAction = createAction('undone');

const todoReducer = createReducer(initialState, {
  [addAction]: add,
  [doneAction]: done,
  [undoneAction]: undone,
});

const store$ = configureStore({
  reducer: todoReducer,
});

module.exports = {
  store$,
  addAction,
  doneAction,
  undoneAction,
};
