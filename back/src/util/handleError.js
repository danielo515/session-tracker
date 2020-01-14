const uuidv4 = require('uuid/v4');
const { STATUS_CODES } = require('http');
const { ERROR_TYPE } = require('./makeError');

const isHttpError = (error) => (error.name === 'HttpError' && error.code && STATUS_CODES[error.code]);

const handleError = ({ formatResponse }) => ({ error, event }) => {
  const { headers } = event;

  // handle service errors
  if (error.type === ERROR_TYPE) {
    return formatResponse({
      result: {
        id: error.data.id,
        errors: [error.data],
      },
      status: error.data.status,
      request: { headers },
    });
  }

  if (isHttpError(error)) {
    return formatResponse({
      status: error.code,
      result: { error: error.message },
      request: { headers },
    });
  }

  // handle server errors
  // log the error inside
  // and return 500 - internal server error
  const id = uuidv4();
  const internalError = {
    id,
    title: error.message,
  };

  if (error.isAxiosError && error.config && error.response) {
    internalError.error = {
      stack: error.stack,
      config: { method: error.config.method, data: error.config.data, url: error.config.url },
      response: { status: error.response.status, data: error.response.data },
    };
  } else {
    internalError.error = error;
  }

  return formatResponse({
    result: {
      id,
      errors: [{ title: 'Internal server error' }],
    },
    status: 500,
    request: { headers },
  });
};

module.exports = handleError;
