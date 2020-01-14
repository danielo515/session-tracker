const decodeToken = require('../util/decodeToken');

const getAuthFromAccessToken = ({
  audience,
  baseDomain,
  secret,
}) => async ({ headers: { authorization } }) => {
  const [, accessToken] = (authorization || '').split(' ');
  const decodedToken = await decodeToken({
    authorization,
    audience: `${audience}.${baseDomain}`,
    issuer: baseDomain,
    secret,
  });

  const { sub: userId } = decodedToken;

  return {
    userId,
    accessToken,
  };
};

module.exports = getAuthFromAccessToken;
