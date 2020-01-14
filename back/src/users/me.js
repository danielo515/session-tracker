const makeHandler = require('../setup/makeHandler');

const echoMe = () => (
  async ({ auth: user }) => ({
    status: 200,
    result: { user },
  }));

module.exports.handler = makeHandler(echoMe, { useAuth: true });
