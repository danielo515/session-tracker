/* eslint-env jest */
const mockUuid = Symbol('mockUuid');
const HttpError = require('standard-http-error');

jest.mock('uuid/v4', () => () => mockUuid);

const handleError = require('./handleError');
const { missingAuthorization } = require('./errors');

const headers = { 'Content-Type': 'application/json', origin: '*' };
const event = { headers };
const logger = { error: jest.fn() };
const formatResponse = jest.fn();


describe('handleError util', () => {
  afterEach(() => logger.error.mockReset());

  it('should handle server error', () => {
    const error = new Error('a message');
    handleError({ logger, formatResponse })({ error, event });

    expect(formatResponse).toBeCalledWith({
      result: {
        id: mockUuid,
        errors: [{
          title: 'Internal server error',
        }],
      },
      status: 500,
      request: { headers },
    });

    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it('should handle service-specific errors', () => {
    const error = missingAuthorization({});
    handleError({ logger, formatResponse })({ error, event });

    expect(formatResponse).toBeCalledWith({
      result: {
        id: mockUuid,
        errors: [{
          id: mockUuid,
          code: 'missing-authorization',
          title: 'Authorization header is missing',
          status: 401,
          source: {},
        }],
      },
      status: 401,
      request: { headers },
    });

    expect(logger.error).toHaveBeenCalledTimes(0);
  });

  it('should return HTTPError with status 403', () => {
    handleError({ logger, formatResponse })({
      error: new HttpError(403),
      event,
    });
    expect(logger.error).not.toHaveBeenCalled();
    expect(formatResponse).toBeCalledWith({
      status: 403,
      request: { headers },
      result: { error: 'Forbidden' },
    });
  });

  it('should filter axios error', () => {
    const stack = Symbol('stack');
    const method = Symbol('method');
    const configData = Symbol('configData');
    const url = Symbol('url');
    const status = Symbol('status');
    const responseData = Symbol('responseData');
    const axiosError = new Error();

    Object.assign(axiosError, {
      stack,
      isAxiosError: true,
      config: {
        method,
        data: configData,
        url,
      },
      response: {
        status,
        data: responseData,
      },
    });

    handleError({ logger, formatResponse })({ error: axiosError, event });

    expect(logger.error).toBeCalledWith(
      'internal server error: ',
      {
        error: {
          stack,
          config: { method, data: configData, url },
          response: { status, data: responseData },
        },
        id: mockUuid,
        title: '',
      },
    );
  });
});
