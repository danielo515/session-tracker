
const makeHandler = require('../setup/makeHandler');

const listSessionsHandler = ({ listSessions }) => (
  async ({ auth: user }) => ({
    status: 200,
    result: {
      sessions: await listSessions(user),
    },
  }));

module.exports.handler = makeHandler(listSessionsHandler);
