import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_EDIT_RUNNING_SESSION_BEGIN,
  COMMON_EDIT_RUNNING_SESSION_SUCCESS,
  COMMON_EDIT_RUNNING_SESSION_FAILURE,
  COMMON_EDIT_RUNNING_SESSION_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  editRunningSession,
  dismissEditRunningSessionError,
  reducer,
} from '../../../../src/features/common/redux/editRunningSession';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/editRunningSession', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when editRunningSession succeeds', () => {
    const store = mockStore({});

    return store.dispatch(editRunningSession())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_EDIT_RUNNING_SESSION_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_EDIT_RUNNING_SESSION_SUCCESS);
      });
  });

  it('dispatches failure action when editRunningSession fails', () => {
    const store = mockStore({});

    return store.dispatch(editRunningSession({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_EDIT_RUNNING_SESSION_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_EDIT_RUNNING_SESSION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissEditRunningSessionError', () => {
    const expectedAction = {
      type: COMMON_EDIT_RUNNING_SESSION_DISMISS_ERROR,
    };
    expect(dismissEditRunningSessionError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_EDIT_RUNNING_SESSION_BEGIN correctly', () => {
    const prevState = { editRunningSessionPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_EDIT_RUNNING_SESSION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editRunningSessionPending).toBe(true);
  });

  it('handles action type COMMON_EDIT_RUNNING_SESSION_SUCCESS correctly', () => {
    const prevState = { editRunningSessionPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_EDIT_RUNNING_SESSION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editRunningSessionPending).toBe(false);
  });

  it('handles action type COMMON_EDIT_RUNNING_SESSION_FAILURE correctly', () => {
    const prevState = { editRunningSessionPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_EDIT_RUNNING_SESSION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editRunningSessionPending).toBe(false);
    expect(state.editRunningSessionError).toEqual(expect.anything());
  });

  it('handles action type COMMON_EDIT_RUNNING_SESSION_DISMISS_ERROR correctly', () => {
    const prevState = { editRunningSessionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_EDIT_RUNNING_SESSION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editRunningSessionError).toBe(null);
  });
});

