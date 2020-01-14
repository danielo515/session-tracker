const makeError = require('./makeError');

const missingAuthorization = (source) => makeError({
  title: 'Authorization header is missing',
  code: 'missing-authorization',
  source,
  status: 401,
});

const userAlreadyExists = (source) => makeError({
  title: 'User already exists',
  code: 'existing-user',
  source,
  status: 409,
});

const unauthorized = (source) => makeError({
  title: 'Login is required',
  code: 'unauthorized',
  source,
  status: 401,
});

const notFound = (source) => makeError({
  title: 'resource does not exists',
  code: 'not-found',
  source,
  status: 404,
});

const invalidCredentials = (source) => makeError({
  title: 'Incorrect password',
  code: 'invalid-credentials',
  source,
  status: 404,
});

const invalidAuthorization = (source) => makeError({
  title: 'Authorization header is invalid',
  code: 'invalid-authorization',
  source,
  status: 400,
});

const sessionTokenMissing = (source) => makeError({
  title: 'SessionToken is required',
  code: 'session-token-missing',
  source,
  status: 401,
});

const invalidContentType = () => makeError({
  title: 'Content-Type must be application/json',
  code: 'invalid-content-type',
  status: 400,
});

module.exports = {
  invalidAuthorization,
  missingAuthorization,
  sessionTokenMissing,
  invalidContentType,
  userAlreadyExists,
  notFound,
  invalidCredentials,
  unauthorized,
};
