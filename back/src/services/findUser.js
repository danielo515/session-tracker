const findUser = ({ dynamoDb }) => async (email) => {
  const params = {
    TableName: `users-${process.env.DYNAMODB_TABLE}`,
    Key: { email },
  };
  const { Item: user } = await dynamoDb.get(params);
  return user;
};

module.exports = findUser;
