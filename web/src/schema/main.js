const SwaggerUI = require('swagger-ui');
require('swagger-ui/dist/swagger-ui.css');
const todoServiceSchema = require('../../../schema/todo.yaml');
const { TODO_SERVICE_BASEURL } = require('./config');

todoServiceSchema.host = new URL(TODO_SERVICE_BASEURL).host;

SwaggerUI({
  spec: todoServiceSchema,
  dom_id: '#swagger',
});
