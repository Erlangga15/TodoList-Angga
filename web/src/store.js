import { createAction, createReducer, configureStore } from '@reduxjs/toolkit';
import { initialState, add, done, undone, del } from './reducer';

export const addAction = createAction('add');
export const doneAction = createAction('done');
export const undoneAction = createAction('undone');
export const deleteAction = createAction('del');

const todoReducer = createReducer(initialState, {
  [addAction]: add,
  [doneAction]: done,
  [undoneAction]: undone,
  [deleteAction]: del,
});

export const store$ = configureStore({
  reducer: todoReducer,
});
