
const makeHandler = require('../setup/makeHandler');

const updateSessionHandler = ({ updateSession }) => (
  async ({ body: session, auth: user, params }) => {
    const { name, endDate } = session;
    return {
      status: 200,
      result: {
        session: await updateSession({ id: params.id, name, endDate, userId: user.userId }),
      },
    };
  });

module.exports.handler = makeHandler(updateSessionHandler);
