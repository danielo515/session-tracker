import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  LOGIN_LOGIN_ACTION_BEGIN,
  LOGIN_LOGIN_ACTION_SUCCESS,
  LOGIN_LOGIN_ACTION_FAILURE,
  LOGIN_LOGIN_ACTION_DISMISS_ERROR,
} from '../../../../src/features/login/redux/constants';

import {
  loginAction,
  dismissLoginActionError,
  reducer,
} from '../../../../src/features/login/redux/loginAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login/redux/loginAction', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loginAction succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loginAction())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', LOGIN_LOGIN_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', LOGIN_LOGIN_ACTION_SUCCESS);
      });
  });

  it('dispatches failure action when loginAction fails', () => {
    const store = mockStore({});

    return store.dispatch(loginAction({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', LOGIN_LOGIN_ACTION_BEGIN);
        expect(actions[1]).toHaveProperty('type', LOGIN_LOGIN_ACTION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoginActionError', () => {
    const expectedAction = {
      type: LOGIN_LOGIN_ACTION_DISMISS_ERROR,
    };
    expect(dismissLoginActionError()).toEqual(expectedAction);
  });

  it('handles action type LOGIN_LOGIN_ACTION_BEGIN correctly', () => {
    const prevState = { loginActionPending: false };
    const state = reducer(
      prevState,
      { type: LOGIN_LOGIN_ACTION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loginActionPending).toBe(true);
  });

  it('handles action type LOGIN_LOGIN_ACTION_SUCCESS correctly', () => {
    const prevState = { loginActionPending: true };
    const state = reducer(
      prevState,
      { type: LOGIN_LOGIN_ACTION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loginActionPending).toBe(false);
  });

  it('handles action type LOGIN_LOGIN_ACTION_FAILURE correctly', () => {
    const prevState = { loginActionPending: true };
    const state = reducer(
      prevState,
      { type: LOGIN_LOGIN_ACTION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loginActionPending).toBe(false);
    expect(state.loginActionError).toEqual(expect.anything());
  });

  it('handles action type LOGIN_LOGIN_ACTION_DISMISS_ERROR correctly', () => {
    const prevState = { loginActionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: LOGIN_LOGIN_ACTION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loginActionError).toBe(null);
  });
});

