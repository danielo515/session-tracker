const makeHandler = require('../setup/makeHandler');

const createSessionHandler = ({ createSession }) => (
  async ({ body: session, auth: user }) => {
    const { userId } = user;
    const { name, startDate } = session;
    return {
      status: 201,
      result: await createSession({ name, startDate, userId }),
    };
  });

module.exports.handler = makeHandler(createSessionHandler, { useAuth: true });
