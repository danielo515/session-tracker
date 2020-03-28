const makeHandler = require('../setup/makeHandler');
const { AUDIENCE } = require('./constats');

const refreshToken = ({ generateToken }) => async ({ auth }) => ({
  status: 200,
  result: {
    token: await generateToken({ userId: auth.userId, aud: AUDIENCE }),
  },
});

module.exports.handler = makeHandler(refreshToken);
