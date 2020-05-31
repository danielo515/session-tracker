const validateRefreshToken = ({ dynamoDb }) => async ({ token, userId }) => {
    const params = {
    TableName: process.env.TOKENS_DYNAMODB_TABLE,
    Key: { id: token },
    };
    const { Item } = await dynamoDb.get(params);
    if(!Item) return false
    return Item.userId === userId;
  };
  
  module.exports = validateRefreshToken;