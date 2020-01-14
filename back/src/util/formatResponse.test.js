/* eslint-env jest */
const formatResponse = require('./formatResponse');

const correlationId = Symbol('correlationId');

describe('formatResponse', () => {
  it('should return body in json string format', () => {
    const body = { test: 1212 };
    const response = formatResponse({ status: 200, result: body, request: { headers: { origin: 'localhost' } } });
    expect(response.statusCode).toBe(200);
    expect(response.headers['Access-Control-Allow-Origin']).toBe('localhost');
    expect(response.body).toBe(JSON.stringify(body));
  });

  it('should return origin * if headers not present', () => {
    const body = { test: 1212 };
    const response = formatResponse({ status: 200, result: body, request: {} });
    expect(response.statusCode).toBe(200);
    expect(response.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('should return correlationId', () => {
    const response = formatResponse({
      status: 200,
      result: {},
      request: {
        headers: {
          'x-correlation-id': correlationId,
        },
      },
    });
    expect(response.headers['x-correlation-id']).toEqual(correlationId);
  });

  it('should return x-correlation-id null if correlationId is not present', () => {
    const response = formatResponse({
      status: 200,
      result: {},
      request: { headers: {} },
    });
    expect(response.headers['x-correlation-id']).toBeUndefined();
  });
});
