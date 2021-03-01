const { client } = require('./client');
const { TODO_SERVICE_BASEURL } = require('../schema/config');

const listTaskApi = async () => {
  return await client.get(`${TODO_SERVICE_BASEURL}/list`);
};

const addTaskApi = async (task) => {
  return await client.post(`${TODO_SERVICE_BASEURL}/add`, { task });
};

const doneTaskApi = async (id) => {
  return await client.put(`${TODO_SERVICE_BASEURL}/done?id=${id}`);
};

const undoneTaskApi = async (id) => {
  return await client.put(`${TODO_SERVICE_BASEURL}/undone?id=${id}`);
};
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
