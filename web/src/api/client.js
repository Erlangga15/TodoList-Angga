/** @module httpClient */

/**
 * Basic client request to `server`
 * @param {string} endpoint target / url endpoint
 * @param {RequestInit} options additional [request](http://localhost)
 * @returns {Promise<any>} request result
 */
const client = async (endpoint, { method, body, ...customConf } = {}) => {
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method,
    ...customConf,
    headers: {
      ...headers,
      ...customConf.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.statusText);
    }
    return data;
  } catch (err) {
    return Promise.reject(err.message || data);
  }
};

/**
 * Request GET method
 * @param {string} endpoint target / url endpoint
 * @param {RequestInit} options additional config
 */
client.get = (endpoint, customConf = {}) => {
  return client(endpoint, { method: 'GET', ...customConf });
};

/**
 * Request POST method
 * @param {string} endpoint target / url endpoint
 * @param {Object} body content of the request
 * @param {RequestInit} options additional config
 */
client.post = (endpoint, body, customConf = {}) => {
  return client(endpoint, { method: 'POST', body, ...customConf });
};

/**
 * Request PUT method
 * @param {string} endpoint target / url endpoint
 * @param {Object} body content of the request
 * @param {RequestInit} options additional config
 */
client.put = (endpoint, body, customConf = {}) => {
  return client(endpoint, { method: 'PUT', body, ...customConf });
};

/**
 * Request DELETE method
 * @param {string} endpoint target / url endpoint
 * @param {Object} body content of the request
 * @param {RequestInit} options additional config
 */
client.delete = (endpoint, body, customConf = {}) => {
  return client(endpoint, { method: 'DELETE', body, ...customConf });
};

module.exports = {
  client,
};
