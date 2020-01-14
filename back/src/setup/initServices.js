const setupServices = require('./setupServices');
const dynamoDb = require('./dynamodb');

const baseDomain = 'danieloRodriguez.com';
const secret = 'test-secret';

const initServices = ({ logger }) => (async () => {
  const services = setupServices({ baseDomain, secret, dynamoDb, logger });

  return { services };
})();

module.exports = initServices;
