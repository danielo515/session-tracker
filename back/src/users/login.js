
const bcrypt = require('bcryptjs');
const { notFound, invalidCredentials } = require('../util/errors');
const makeHandler = require('../setup/makeHandler');
const { AUDIENCE } = require('./constats');

const login = ({ findUser, generateToken, createRefreshToken }) => async ({ body: user }) => {
  const existingUser = await findUser(user.email);
  if (!existingUser) throw notFound();
  const isPasswordOk = await bcrypt.compare(user.password, existingUser.password);
  if (!isPasswordOk) throw invalidCredentials();
  const refreshToken = await createRefreshToken({ userId: existingUser.id });
  return {
    status: 200,
    result: {
      token: await generateToken({ userId: existingUser.id, aud: AUDIENCE }),
    },
    headers: {
      'Set-Cookie': `refresh_token=${refreshToken}; HttpOnly; Secure;`,
    },
  };
};

module.exports.handler = makeHandler(login, { useAuth: false });
