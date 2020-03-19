const updateSession = ({ dynamoDb }) => async ({ id, name, endDate, userId, startDate }) => {
  const timestamp = new Date().getTime();
  const eDate = new Date(endDate);
  const sDate = new Date(startDate);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { id, userId },
    ...(name && { ExpressionAttributeNames: { '#name': 'name' } }),
    ExpressionAttributeValues: {
      ...(name && { ':name': name }),
      ...(endDate && { ':endDate': endDate && eDate.toISOString() }),
      ...(startDate && { ':startDate': startDate && sDate.toISOString() }),
      ':updatedAt': timestamp,
    },
    UpdateExpression: `SET ${[
      name && '#name = :name',
      endDate && 'endDate = :endDate',
      startDate && 'startDate = :startDate',
      'updatedAt = :updatedAt'].filter((x) => x).join(', ')}`,
    ReturnValues: 'ALL_NEW',
  };

  const { Attributes } = await dynamoDb.update(params);

  return Attributes;
};

module.exports = updateSession;
