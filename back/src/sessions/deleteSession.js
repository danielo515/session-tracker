
const makeHandler = require('../setup/makeHandler');

const deleteSessionHandler = ({ deleteSession }) => (
  async ({ auth: user, params }) => ({
    status: 200,
    result: {
      session: await deleteSession({ sessionId: params.id, userId: user.userId }),
    },
  }));

module.exports.handler = makeHandler(deleteSessionHandler);
