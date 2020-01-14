const listSessions = ({ dynamoDb }) => async ({ userId }) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    IndexName: 'byDate',
    ExpressionAttributeValues: { ':userId': userId },
    // ExpressionAttributeNames: { '#userId': 'userId' },
    // FilterExpression: '#userId = :userId', // a string representing a constraint on the attribute
    KeyConditionExpression: 'userId = :userId',
  };
  const { Items: sessions } = await dynamoDb.query(params);
  return sessions;
};

module.exports = listSessions;
