
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const { promisify } = require('util');

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = {
  put: promisify(client.put.bind(client)),
  scan: promisify(client.scan.bind(client)),
  query: promisify(client.query.bind(client)),
  update: promisify(client.update.bind(client)),
  get: promisify(client.get.bind(client)),
  delete: promisify(client.delete.bind(client)),
};
