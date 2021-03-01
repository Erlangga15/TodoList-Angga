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

const listTaskClient = async (dispatch) => {
  try {
    const listTask = await listTaskApi();
    dispatch(listAction(listTask));
  } catch (err) {
    console.log(err);
  }
};

const addTaskClient = (task) => async (dispatch) => {
  try {
    const taskData = await addTaskApi(task);
    dispatch(addAction(taskData));
  } catch (err) {
    console.log(err);
  }
};

const doneTaskClient = (id) => async (dispatch) => {
    try {
      const taskDataDone = await doneTaskApi(id);
      dispatch(doneAction(taskDataDone));
    } catch (err) {
      console.log(err);
    }
  };

const undoneTaskClient = (id) => {
  return async (dispatch) => {
    const taskDataDone = await undoneTaskApi(id);
    dispatch(undoneAction(taskDataDone));
  };
};

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
