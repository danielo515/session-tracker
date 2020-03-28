const makeHandler = require('../setup/makeHandler');

const updateSessionHandler = ({ updateSession }) => async ({
  body: session,
  auth: user,
  params,
}) => {
  const { name, endDate, startDate } = session;
  return {
    status: 200,
    result: {
      session: await updateSession({
        id: params.id,
        name,
        endDate,
        startDate,
        userId: user.userId,
      }),
    },
  };
};

module.exports.handler = makeHandler(updateSessionHandler);
