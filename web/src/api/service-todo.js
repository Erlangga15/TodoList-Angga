/** @module todoService */

const { client } = require('./client');
const { TODO_SERVICE_BASEURL } = require('../schema/config');

/**
 * Get list of task
 * @returns {Promise<Task[]>} list of task
 */
const listTaskApi = async () => {
  return await client.get(`${TODO_SERVICE_BASEURL}/list`);
};

/**
 * Add new task to todo list
 * @param {TaskData} task task data
 * @returns {Promise<Task>} details of the work that has been saved
 */
const addTaskApi = async (task) => {
  return await client.post(`${TODO_SERVICE_BASEURL}/add`, { task });
};

/**
 * Indicates task has been completed
 * @param {number} id task id
 * @returns {Promise<Task>} details of the work that has been saved
 */
const doneTaskApi = async (id) => {
  return await client.put(`${TODO_SERVICE_BASEURL}/done?id=${id}`);
};

/**
 * Indicates task is not finished
 * @param {number} id task id
 * @returns {Promise<Task>} details of the work that has been saved
 */
const undoneTaskApi = async (id) => {
  return await client.put(`${TODO_SERVICE_BASEURL}/undone?id=${id}`);
};

/**
 * Delete task
 * @param {number} id task id
 * @returns {Promise<Task>} details of the work that has been saved
 */
const removeTaskApi = async (id) => {
  return await client.delete(`${TODO_SERVICE_BASEURL}/remove?id=${id}`);
};

module.exports = {
  listTaskApi,
  addTaskApi,
  doneTaskApi,
  undoneTaskApi,
  removeTaskApi,
};
