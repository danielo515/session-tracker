import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SESSION_DEFINITION_FETCH_ALL_BEGIN,
  SESSION_DEFINITION_FETCH_ALL_SUCCESS,
  SESSION_DEFINITION_FETCH_ALL_FAILURE,
  SESSION_DEFINITION_FETCH_ALL_DISMISS_ERROR,
} from '../../../../src/features/session-definition/redux/constants';

import {
  fetchAll,
  dismissFetchAllError,
  reducer,
} from '../../../../src/features/session-definition/redux/fetchAll';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('session-definition/redux/fetchAll', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchAll succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchAll())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SESSION_DEFINITION_FETCH_ALL_BEGIN);
        expect(actions[1]).toHaveProperty('type', SESSION_DEFINITION_FETCH_ALL_SUCCESS);
      });
  });

  it('dispatches failure action when fetchAll fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchAll({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SESSION_DEFINITION_FETCH_ALL_BEGIN);
        expect(actions[1]).toHaveProperty('type', SESSION_DEFINITION_FETCH_ALL_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchAllError', () => {
    const expectedAction = {
      type: SESSION_DEFINITION_FETCH_ALL_DISMISS_ERROR,
    };
    expect(dismissFetchAllError()).toEqual(expectedAction);
  });

  it('handles action type SESSION_DEFINITION_FETCH_ALL_BEGIN correctly', () => {
    const prevState = { fetchAllPending: false };
    const state = reducer(
      prevState,
      { type: SESSION_DEFINITION_FETCH_ALL_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAllPending).toBe(true);
  });

  it('handles action type SESSION_DEFINITION_FETCH_ALL_SUCCESS correctly', () => {
    const prevState = { fetchAllPending: true };
    const state = reducer(
      prevState,
      { type: SESSION_DEFINITION_FETCH_ALL_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAllPending).toBe(false);
  });

  it('handles action type SESSION_DEFINITION_FETCH_ALL_FAILURE correctly', () => {
    const prevState = { fetchAllPending: true };
    const state = reducer(
      prevState,
      { type: SESSION_DEFINITION_FETCH_ALL_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAllPending).toBe(false);
    expect(state.fetchAllError).toEqual(expect.anything());
  });

  it('handles action type SESSION_DEFINITION_FETCH_ALL_DISMISS_ERROR correctly', () => {
    const prevState = { fetchAllError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SESSION_DEFINITION_FETCH_ALL_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchAllError).toBe(null);
  });
});

