const isDev = (/develop||test/).test(process.env.NODE_ENV);
const formatResponse = require('../util/formatResponse');
const HandleError = require('../util/handleError');

const handleError = HandleError({ formatResponse });
const safeParse = (str) => {
  if (!str) return {};
  try {
    return JSON.parse(str);
  } catch (e) { return {}; }
};

const formatEventAsRequest = (
  {
    pathParameters: params,
    queryStringParameters: query,
    body,
    headers: eventHeaders,
    httpMethod,
  },
) => {
  const headers = {};
  Object.entries(eventHeaders || {}).forEach(([key, val]) => {
    headers[key.toLowerCase()] = val;
  });
  return {
    params: params || {},
    query: query || {},
    body: safeParse(body),
    headers,
    method: httpMethod,
  };
};

const wrapHandler = ({ handler, logger, getAuth }) => async (event) => {
  try {
    const requestLike = formatEventAsRequest(event);
    const auth = getAuth ? await getAuth(requestLike) : undefined;
    const { status, result } = await handler({ ...requestLike, auth });
    return formatResponse({ status, result, request: requestLike });
  } catch (error) {
    if (isDev) logger.error(error);
    return handleError({ error, event });
  }
};

module.exports = wrapHandler;
