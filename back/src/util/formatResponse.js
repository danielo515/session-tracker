const formatResponse = ({ status, result, request }) => {
  const origin = (request.headers || {}).origin
    ? request.headers.origin
    : '*';

  const correlationId = (request.headers || {})['x-correlation-id'];

  return {
    statusCode: status,
    body: JSON.stringify(result),
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
      'x-correlation-id': correlationId,
    },
  };
};

module.exports = formatResponse;
