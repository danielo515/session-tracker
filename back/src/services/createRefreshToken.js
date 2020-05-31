const uuidv4 = require('uuid/v4');

const createRefreshToken = ({ dynamoDb }) => async ({ userId }) => {
  const date = new Date();
  const timestamp = date.getTime();
  const id = uuidv4();
  const params = {
    TableName: process.env.TOKENS_DYNAMODB_TABLE,
    Item: {
      id,
      userId,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  await dynamoDb.put(params);
  return params.Item.id;
};

module.exports = createRefreshToken;
