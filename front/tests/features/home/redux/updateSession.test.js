import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_UPDATE_SESSION_BEGIN,
  HOME_UPDATE_SESSION_SUCCESS,
  HOME_UPDATE_SESSION_FAILURE,
  HOME_UPDATE_SESSION_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  updateSession,
  dismissUpdateSessionError,
  reducer,
} from 'src/features/home/redux/updateSession';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/updateSession', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateSession succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateSession())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_UPDATE_SESSION_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_UPDATE_SESSION_SUCCESS);
      });
  });

  it('dispatches failure action when updateSession fails', () => {
    const store = mockStore({});

    return store.dispatch(updateSession({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_UPDATE_SESSION_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_UPDATE_SESSION_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissUpdateSessionError', () => {
    const expectedAction = {
      type: HOME_UPDATE_SESSION_DISMISS_ERROR,
    };
    expect(dismissUpdateSessionError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_UPDATE_SESSION_BEGIN correctly', () => {
    const prevState = { updateSessionPending: false };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_SESSION_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateSessionPending).to.be.true;
  });

  it('handles action type HOME_UPDATE_SESSION_SUCCESS correctly', () => {
    const prevState = { updateSessionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_SESSION_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateSessionPending).to.be.false;
  });

  it('handles action type HOME_UPDATE_SESSION_FAILURE correctly', () => {
    const prevState = { updateSessionPending: true };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_SESSION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateSessionPending).to.be.false;
    expect(state.updateSessionError).to.exist;
  });

  it('handles action type HOME_UPDATE_SESSION_DISMISS_ERROR correctly', () => {
    const prevState = { updateSessionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_UPDATE_SESSION_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.updateSessionError).to.be.null;
  });
});