import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SESSION_DEFINITION_CREATE_BEGIN,
  SESSION_DEFINITION_CREATE_SUCCESS,
  SESSION_DEFINITION_CREATE_FAILURE,
  SESSION_DEFINITION_CREATE_DISMISS_ERROR,
} from '../../../../src/features/session-definition/redux/constants';

import {
  create,
  dismissCreateError,
  reducer,
} from '../../../../src/features/session-definition/redux/create';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('session-definition/redux/create', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when create succeeds', () => {
    const store = mockStore({});

    return store.dispatch(create())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SESSION_DEFINITION_CREATE_BEGIN);
        expect(actions[1]).toHaveProperty('type', SESSION_DEFINITION_CREATE_SUCCESS);
      });
  });

  it('dispatches failure action when create fails', () => {
    const store = mockStore({});

    return store.dispatch(create({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SESSION_DEFINITION_CREATE_BEGIN);
        expect(actions[1]).toHaveProperty('type', SESSION_DEFINITION_CREATE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCreateError', () => {
    const expectedAction = {
      type: SESSION_DEFINITION_CREATE_DISMISS_ERROR,
    };
    expect(dismissCreateError()).toEqual(expectedAction);
  });

  it('handles action type SESSION_DEFINITION_CREATE_BEGIN correctly', () => {
    const prevState = { createPending: false };
    const state = reducer(
      prevState,
      { type: SESSION_DEFINITION_CREATE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createPending).toBe(true);
  });

  it('handles action type SESSION_DEFINITION_CREATE_SUCCESS correctly', () => {
    const prevState = { createPending: true };
    const state = reducer(
      prevState,
      { type: SESSION_DEFINITION_CREATE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createPending).toBe(false);
  });

  it('handles action type SESSION_DEFINITION_CREATE_FAILURE correctly', () => {
    const prevState = { createPending: true };
    const state = reducer(
      prevState,
      { type: SESSION_DEFINITION_CREATE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createPending).toBe(false);
    expect(state.createError).toEqual(expect.anything());
  });

  it('handles action type SESSION_DEFINITION_CREATE_DISMISS_ERROR correctly', () => {
    const prevState = { createError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SESSION_DEFINITION_CREATE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createError).toBe(null);
  });
});

