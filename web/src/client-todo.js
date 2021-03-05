/** @module clientTodo */
const { captureException } = require ('@sentry/vue');
require('./api/sentry')

const {
  listTaskApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
  removeTaskApi,
} = require('./api/service-todo');
const {
  listAction,
  addAction,
  doneAction,
  undoneAction,
  removeAction,
} = require('./store');

/**
 * Dispatch load task
 * @param {*} dispatch load action
 */
const listTaskClient = async (dispatch) => {
  try {
    const listTask = await listTaskApi();
    dispatch(listAction(listTask));
  } catch (err) {
    captureException(new Error('Failed get list of task'));
    console.log(err);
  }
};

/**
 * Dispatch add new task
 * @param {*} dispatch add action
 */
const addTaskClient = (task) => async (dispatch) => {
  try {
    const taskData = await addTaskApi(task);
    dispatch(addAction(taskData));
  } catch (err) {
    captureException(new Error('Failed add task'));
    console.log(err);
  }
};

/**
 * Dispatch set task to done
 * @param {*} dispatch done action
 */
const doneTaskClient = (id) => async (dispatch) => {
    try {
      const taskDataDone = await doneTaskApi(id);
      dispatch(doneAction(taskDataDone));
    } catch (err) {
      captureException(new Error('Failed set task to done'));
      console.log(err);
    }
  };

/**
 * Dispatch set task to undone
 * @param {*} dispatch undone action
 */
const undoneTaskClient = (id) => {
  return async (dispatch) => {
    const taskDataDone = await undoneTaskApi(id);
    dispatch(undoneAction(taskDataDone));
  };
};

/**
 * Dispatch remove task
 * @param {*} dispatch remove action
 */
const removeTaskClient = (id) => {
  return async (dispatch) => {
    const taskData = await removeTaskApi(id);
    dispatch(removeAction(taskData));
  };
};

module.exports = {
  listTaskClient,
  addTaskClient,
  doneTaskClient,
  undoneTaskClient,
  removeTaskClient,
};
