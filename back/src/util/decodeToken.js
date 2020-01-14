const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const { invalidAuthorization, missingAuthorization } = require('./errors');

const verifyAsync = promisify(jwt.verify);

const decodeToken = async ({
  authorization,
  audience,
  issuer,
  secret,
}) => {
  if (!authorization) {
    throw missingAuthorization({ data: 'authorization is missing' });
  }

  const [type, accessToken] = authorization.split(' ');

  if (type !== 'Bearer' || !accessToken) {
    throw invalidAuthorization({ data: 'authorization is invalid' });
  }

  try {
    return await verifyAsync(
      accessToken,
      secret,
      { audience, issuer },
    );
  } catch (error) {
    throw invalidAuthorization({ data: error });
  }
};

module.exports = decodeToken;
