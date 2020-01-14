const uuidv4 = require('uuid/v4');
const { hash } = require('./hash');


const saveUser = ({ dynamoDb }) => async ({ email, name, password }) => {
  const timestamp = new Date().getTime();
  const id = uuidv4();
  const params = {
    TableName: process.env.USERS_DYNAMODB_TABLE,
    Item: {
      id,
      email,
      name,
      password: await hash(password, 10),
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  await dynamoDb.put(params);
  return params.Item;
};

module.exports = saveUser;
