import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SETTINGS_LOAD_SESSION_SETTINGS_BEGIN,
  SETTINGS_LOAD_SESSION_SETTINGS_SUCCESS,
  SETTINGS_LOAD_SESSION_SETTINGS_FAILURE,
  SETTINGS_LOAD_SESSION_SETTINGS_DISMISS_ERROR,
} from '../../../../src/features/settings/redux/constants';

import {
  loadSessionSettings,
  dismissLoadSessionSettingsError,
  reducer,
} from '../../../../src/features/settings/redux/loadSessionSettings';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('settings/redux/loadSessionSettings', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadSessionSettings succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadSessionSettings())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SETTINGS_LOAD_SESSION_SETTINGS_BEGIN);
        expect(actions[1]).toHaveProperty('type', SETTINGS_LOAD_SESSION_SETTINGS_SUCCESS);
      });
  });

  it('dispatches failure action when loadSessionSettings fails', () => {
    const store = mockStore({});

    return store.dispatch(loadSessionSettings({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SETTINGS_LOAD_SESSION_SETTINGS_BEGIN);
        expect(actions[1]).toHaveProperty('type', SETTINGS_LOAD_SESSION_SETTINGS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadSessionSettingsError', () => {
    const expectedAction = {
      type: SETTINGS_LOAD_SESSION_SETTINGS_DISMISS_ERROR,
    };
    expect(dismissLoadSessionSettingsError()).toEqual(expectedAction);
  });

  it('handles action type SETTINGS_LOAD_SESSION_SETTINGS_BEGIN correctly', () => {
    const prevState = { loadSessionSettingsPending: false };
    const state = reducer(
      prevState,
      { type: SETTINGS_LOAD_SESSION_SETTINGS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadSessionSettingsPending).toBe(true);
  });

  it('handles action type SETTINGS_LOAD_SESSION_SETTINGS_SUCCESS correctly', () => {
    const prevState = { loadSessionSettingsPending: true };
    const state = reducer(
      prevState,
      { type: SETTINGS_LOAD_SESSION_SETTINGS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadSessionSettingsPending).toBe(false);
  });

  it('handles action type SETTINGS_LOAD_SESSION_SETTINGS_FAILURE correctly', () => {
    const prevState = { loadSessionSettingsPending: true };
    const state = reducer(
      prevState,
      { type: SETTINGS_LOAD_SESSION_SETTINGS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadSessionSettingsPending).toBe(false);
    expect(state.loadSessionSettingsError).toEqual(expect.anything());
  });

  it('handles action type SETTINGS_LOAD_SESSION_SETTINGS_DISMISS_ERROR correctly', () => {
    const prevState = { loadSessionSettingsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SETTINGS_LOAD_SESSION_SETTINGS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadSessionSettingsError).toBe(null);
  });
});

