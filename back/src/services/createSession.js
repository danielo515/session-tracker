const uuidv4 = require('uuid/v4');

const createSession = ({ dynamoDb }) => async ({ name, startDate, userId }) => {
  const timestamp = new Date().getTime();
  const id = uuidv4();
  const date = new Date(startDate);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id,
      userId,
      startDate: date.toISOString(),
      createdAt: timestamp,
      updatedAt: timestamp,
      ...(name && { name }), // name is optional
    },
  };
  await dynamoDb.put(params);
  return params.Item;
};

module.exports = createSession;
