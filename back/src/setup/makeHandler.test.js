const event = Symbol('event');
const initedHandler = Symbol('initedHandler');
const mockWrapHandler = jest.fn(() => () => { });
const mockServices = Symbol('makeServices');

jest.mock('./initServices', () => () => ({ services: mockServices }));

const handler = jest.fn(() => initedHandler);

const makeHandler = require('./makeHandler');

describe('makeHandler', () => {
  it('should pass handler, getAuth, and logger to wrapHandler', async () => {
    await makeHandler(handler)(event);

    expect(handler).toHaveBeenCalledWith(mockServices);

    expect(mockWrapHandler).toBeCalledWith(expect.objectContaining({
      handler: initedHandler,
    }));
  });
});
