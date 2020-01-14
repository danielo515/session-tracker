const jwt = require('jsonwebtoken');

const EXPIRATION_LENGTH = '1day';

const generateToken = ({
  secret,
  baseDomain,
}) => ({
  userId,
  aud,
}) => (
  new Promise((resolve, reject) => (
    jwt.sign(
      { },
      secret,
      {
        issuer: baseDomain,
        subject: userId,
        audience: `${aud}.${baseDomain}`,
        expiresIn: EXPIRATION_LENGTH,
      },
      (error, token) => (error ? reject(error) : resolve(token)),
    )))
);

module.exports = generateToken;
