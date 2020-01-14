const findSession = ({ dynamoDb }) => async (sessionId) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id: sessionId },
  };
  const { Item: session } = await dynamoDb.get(params);
  return session;
};

module.exports = findSession;
