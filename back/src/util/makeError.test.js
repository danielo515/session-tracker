/* eslint-env jest */

const mockUuid = Symbol('mockUuid');

jest.mock('uuid/v4', () => () => mockUuid);

const makeError = require('./makeError');

describe('makeError', () => {
  it('creates an error', () => {
    const error = makeError({});
    expect(error).toBeInstanceOf(Error);
  });

  it('sets type to time-track-error', () => {
    const error = makeError({});
    expect(error.type).toEqual('time-track-error');
  });

  it('trims the stack trace to the caller', () => {
    const error = makeError({});
    expect(error.stack).not.toMatch(/\/src\/makeError\.js/);
  });

  it('assigns id if not given', () => {
    const error = makeError({});
    expect(error.data.id).toEqual(mockUuid);
  });

  it('keeps id if given', () => {
    const id = Symbol('id');
    const error = makeError({ id });
    expect(error.data.id).toEqual(id);
  });

  it('assigns status if not given', () => {
    const error = makeError({});
    expect(error.data.status).toEqual(500);
  });

  it('keeps status if given', () => {
    const status = Symbol('status');
    const error = makeError({ status });
    expect(error.data.status).toEqual(status);
  });
});
