/**
 * Takes a simple object and generates a valid http response from it. 
 * Injects the appropriate headers from the original request, formatting the result as JSON
 * and adds any provided header
 * @param {Object} opt
 * @param {number} opt.status http status code
 * @param {Object} opt.result the response to return to the caller
 * @param {Object} opt.request the original request that triggered this response
 * @param {Object} [opt.headers] Optional extra headers to inject on the response
 */
const formatResponse = ({ status, result, request, headers }) => {
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
      ...headers,
    },
  };
};

module.exports = formatResponse;
