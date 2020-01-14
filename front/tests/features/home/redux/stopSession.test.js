import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_STOP_SESSION_BEGIN,
  HOME_STOP_SESSION_SUCCESS,
  HOME_STOP_SESSION_FAILURE,
  HOME_STOP_SESSION_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  stopSession,
  dismissStopSessionError,
  reducer,
} from 'src/features/home/redux/stopSession';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/stopSession', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when stopSession succeeds', () => {
    const store = mockStore({});

    return store.dispatch(stopSession())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_STOP_SESSION_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_STOP_SESSION_SUCCESS);
      });
  });

  it('dispatches failure action when stopSession fails', () => {
    const store = mockStore({});

    return store.dispatch(stopSession({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_STOP_SESSION_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_STOP_SESSION_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissStopSessionError', () => {
    const expectedAction = {
      type: HOME_STOP_SESSION_DISMISS_ERROR,
    };
    expect(dismissStopSessionError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_STOP_SESSION_BEGIN correctly', () => {
    const prevState = { stopSessionPending: false };
    const state = reducer(
      prevState,
      { type: HOME_STOP_SESSION_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.stopSessionPending).to.be.true;
  });

  it('handles action type HOME_STOP_SESSION_SUCCESS correctly', () => {
    const prevState = { stopSessionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_STOP_SESSION_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.stopSessionPending).to.be.false;
  });

  it('handles action type HOME_STOP_SESSION_FAILURE correctly', () => {
    const prevState = { stopSessionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_STOP_SESSION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.stopSessionPending).to.be.false;
    expect(state.stopSessionError).to.exist;
  });

  it('handles action type HOME_STOP_SESSION_DISMISS_ERROR correctly', () => {
    const prevState = { stopSessionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_STOP_SESSION_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.stopSessionError).to.be.null;
  });
});