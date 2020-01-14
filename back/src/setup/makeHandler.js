const wrapHandler = require('./wrapHandler');
const initServices = require('./initServices');

const makeHandler = (handler, { useAuth = true } = {}) => {
  const logger = console;
  const servicesPromise = initServices({ logger });

  return async (event) => {
    const { services } = await servicesPromise;
    const { getAuth } = services;
    return wrapHandler({
      handler: handler(services),
      logger,
      ...(useAuth && { getAuth }),
    })(event);
  };
};


module.exports = makeHandler;
