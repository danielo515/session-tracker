import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  STATS_GET_SESSIONS_BEGIN,
  STATS_GET_SESSIONS_SUCCESS,
  STATS_GET_SESSIONS_FAILURE,
  STATS_GET_SESSIONS_DISMISS_ERROR,
} from 'src/features/stats/redux/constants';

import {
  getSessions,
  dismissGetSessionsError,
  reducer,
} from 'src/features/stats/redux/getSessions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('stats/redux/getSessions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getSessions succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getSessions())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', STATS_GET_SESSIONS_BEGIN);
        expect(actions[1]).to.have.property('type', STATS_GET_SESSIONS_SUCCESS);
      });
  });

  it('dispatches failure action when getSessions fails', () => {
    const store = mockStore({});

    return store.dispatch(getSessions({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', STATS_GET_SESSIONS_BEGIN);
        expect(actions[1]).to.have.property('type', STATS_GET_SESSIONS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissGetSessionsError', () => {
    const expectedAction = {
      type: STATS_GET_SESSIONS_DISMISS_ERROR,
    };
    expect(dismissGetSessionsError()).to.deep.equal(expectedAction);
  });

  it('handles action type STATS_GET_SESSIONS_BEGIN correctly', () => {
    const prevState = { getSessionsPending: false };
    const state = reducer(
      prevState,
      { type: STATS_GET_SESSIONS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSessionsPending).to.be.true;
  });

  it('handles action type STATS_GET_SESSIONS_SUCCESS correctly', () => {
    const prevState = { getSessionsPending: true };
    const state = reducer(
      prevState,
      { type: STATS_GET_SESSIONS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSessionsPending).to.be.false;
  });

  it('handles action type STATS_GET_SESSIONS_FAILURE correctly', () => {
    const prevState = { getSessionsPending: true };
    const state = reducer(
      prevState,
      { type: STATS_GET_SESSIONS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSessionsPending).to.be.false;
    expect(state.getSessionsError).to.exist;
  });

  it('handles action type STATS_GET_SESSIONS_DISMISS_ERROR correctly', () => {
    const prevState = { getSessionsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: STATS_GET_SESSIONS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.getSessionsError).to.be.null;
  });
});