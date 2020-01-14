import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  COMMON_SETUP_APP_BEGIN,
  COMMON_SETUP_APP_SUCCESS,
  COMMON_SETUP_APP_FAILURE,
  COMMON_SETUP_APP_DISMISS_ERROR,
} from 'src/features/common/redux/constants';

import {
  setupApp,
  dismissSetupAppError,
  reducer,
} from 'src/features/common/redux/setupApp';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/setupApp', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when setupApp succeeds', () => {
    const store = mockStore({});

    return store.dispatch(setupApp())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_SETUP_APP_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_SETUP_APP_SUCCESS);
      });
  });

  it('dispatches failure action when setupApp fails', () => {
    const store = mockStore({});

    return store.dispatch(setupApp({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', COMMON_SETUP_APP_BEGIN);
        expect(actions[1]).to.have.property('type', COMMON_SETUP_APP_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissSetupAppError', () => {
    const expectedAction = {
      type: COMMON_SETUP_APP_DISMISS_ERROR,
    };
    expect(dismissSetupAppError()).to.deep.equal(expectedAction);
  });

  it('handles action type COMMON_SETUP_APP_BEGIN correctly', () => {
    const prevState = { setupAppPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_SETUP_APP_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.setupAppPending).to.be.true;
  });

  it('handles action type COMMON_SETUP_APP_SUCCESS correctly', () => {
    const prevState = { setupAppPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_SETUP_APP_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.setupAppPending).to.be.false;
  });

  it('handles action type COMMON_SETUP_APP_FAILURE correctly', () => {
    const prevState = { setupAppPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_SETUP_APP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.setupAppPending).to.be.false;
    expect(state.setupAppError).to.exist;
  });

  it('handles action type COMMON_SETUP_APP_DISMISS_ERROR correctly', () => {
    const prevState = { setupAppError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_SETUP_APP_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.setupAppError).to.be.null;
  });
});