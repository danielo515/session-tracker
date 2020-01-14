import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_START_SESSION_BEGIN,
  HOME_START_SESSION_SUCCESS,
  HOME_START_SESSION_FAILURE,
  HOME_START_SESSION_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  startSession,
  dismissStartSessionError,
  reducer,
} from 'src/features/home/redux/startSession';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/startSession', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when startSession succeeds', () => {
    const store = mockStore({});

    return store.dispatch(startSession())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_START_SESSION_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_START_SESSION_SUCCESS);
      });
  });

  it('dispatches failure action when startSession fails', () => {
    const store = mockStore({});

    return store.dispatch(startSession({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_START_SESSION_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_START_SESSION_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissStartSessionError', () => {
    const expectedAction = {
      type: HOME_START_SESSION_DISMISS_ERROR,
    };
    expect(dismissStartSessionError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_START_SESSION_BEGIN correctly', () => {
    const prevState = { startSessionPending: false };
    const state = reducer(
      prevState,
      { type: HOME_START_SESSION_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.startSessionPending).to.be.true;
  });

  it('handles action type HOME_START_SESSION_SUCCESS correctly', () => {
    const prevState = { startSessionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_START_SESSION_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.startSessionPending).to.be.false;
  });

  it('handles action type HOME_START_SESSION_FAILURE correctly', () => {
    const prevState = { startSessionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_START_SESSION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.startSessionPending).to.be.false;
    expect(state.startSessionError).to.exist;
  });

  it('handles action type HOME_START_SESSION_DISMISS_ERROR correctly', () => {
    const prevState = { startSessionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_START_SESSION_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.startSessionError).to.be.null;
  });
});