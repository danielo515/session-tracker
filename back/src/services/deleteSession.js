const listSessions = ({ dynamoDb }) => async ({ sessionId, userId }) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      userId,
      id: sessionId,
    },
  };

  await dynamoDb.delete(params);
  return { deleted: true, id: sessionId };
};

module.exports = listSessions;
