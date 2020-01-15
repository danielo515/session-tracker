const { userAlreadyExists } = require('../util/errors');
const makeHandler = require('../setup/makeHandler');

const createUser = ({ findUser, saveUser }) => async ({ body: user }) => {
  const existingUser = await findUser(user.email);
  if (existingUser) throw userAlreadyExists();
  const {password, ...userWoPass} = await saveUser(user)
  return {
    status: 201,
    result: userWoPass,
  };
};

module.exports.handler = makeHandler(createUser, { useAuth: false });
