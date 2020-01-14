// https://jsonapi.org/format/#error-objects

const uuidv4 = require('uuid/v4');

const ERROR_TYPE = 'time-track-error';

const makeError = ({ title, ...data }) => {
  const error = new Error(title);

  error.type = ERROR_TYPE;
  error.data = {
    id: data.id || uuidv4(),
    status: data.status || 500,
    title,
    ...data,
  };
  Error.captureStackTrace(error, makeError);

  return error;
};

makeError.ERROR_TYPE = ERROR_TYPE;

module.exports = makeError;
