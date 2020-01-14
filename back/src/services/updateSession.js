const updateSession = ({ dynamoDb }) => async ({ id, name, endDate, userId }) => {
  const timestamp = new Date().getTime();
  const date = new Date(endDate);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id, userId },
    ...(name && { ExpressionAttributeNames: { '#name': 'name' } }),
    ExpressionAttributeValues: {
      ...(name && { ':name': name }),
      ...(endDate && { ':endDate': endDate && date.toISOString() }),
      ':updatedAt': timestamp,
    },
    UpdateExpression: `SET ${[
      name && '#name = :name',
      endDate && 'endDate = :endDate',
      'updatedAt = :updatedAt'].filter((x) => x).join(', ')}`,
    ReturnValues: 'ALL_NEW',
  };

  const { Attributes } = await dynamoDb.update(params);

  return Attributes;
};

module.exports = updateSession;
