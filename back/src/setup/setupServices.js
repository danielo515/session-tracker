const GenerateToken = require('../services/generateToken');
const SaveUser = require('../services/saveUser');
const FindUser = require('../services/findUser');
const createSession = require('../services/createSession');
const updateSession = require('../services/updateSession');
const deleteSession = require('../services/deleteSession');
const findSession = require('../services/findSession');
const listSessions = require('../services/listSessions');
const getAuthFromAccessToken = require('../services/getAuthFromAccessToken');
const { AUDIENCE } = require('../users/constats');
const createRefreshToken = require('../services/createRefreshToken');
const validateRefreshToken = require('../services/validateRefreshToken');

const setupServices = ({ secret, baseDomain, logger, dynamoDb }) => {
  const generateToken = GenerateToken({ secret, baseDomain });
  return {
    generateToken,
    saveUser: SaveUser({ dynamoDb, logger }),
    findUser: FindUser({ dynamoDb, logger }),
    deleteSession: deleteSession({ dynamoDb, logger }),
    updateSession: updateSession({ dynamoDb, logger }),
    createSession: createSession({ dynamoDb, logger }),
    findSession: findSession({ dynamoDb, logger }),
    listSessions: listSessions({ dynamoDb, logger }),
    getAuth: getAuthFromAccessToken({ secret, audience: AUDIENCE, baseDomain }),
    createRefreshToken: createRefreshToken({ dynamoDb }),
    validateRefreshToken: validateRefreshToken({ dynamoDb })
  };
};

module.exports = setupServices;
