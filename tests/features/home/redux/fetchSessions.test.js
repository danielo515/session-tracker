import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_FETCH_SESSIONS_BEGIN,
  HOME_FETCH_SESSIONS_SUCCESS,
  HOME_FETCH_SESSIONS_FAILURE,
  HOME_FETCH_SESSIONS_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  fetchSessions,
  dismissFetchSessionsError,
  reducer,
} from 'src/features/home/redux/fetchSessions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchSessions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchSessions succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchSessions())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_SESSIONS_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_SESSIONS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchSessions fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchSessions({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_FETCH_SESSIONS_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_FETCH_SESSIONS_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissFetchSessionsError', () => {
    const expectedAction = {
      type: HOME_FETCH_SESSIONS_DISMISS_ERROR,
    };
    expect(dismissFetchSessionsError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_FETCH_SESSIONS_BEGIN correctly', () => {
    const prevState = { fetchSessionsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_SESSIONS_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchSessionsPending).to.be.true;
  });

  it('handles action type HOME_FETCH_SESSIONS_SUCCESS correctly', () => {
    const prevState = { fetchSessionsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_SESSIONS_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchSessionsPending).to.be.false;
  });

  it('handles action type HOME_FETCH_SESSIONS_FAILURE correctly', () => {
    const prevState = { fetchSessionsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_SESSIONS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchSessionsPending).to.be.false;
    expect(state.fetchSessionsError).to.exist;
  });

  it('handles action type HOME_FETCH_SESSIONS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchSessionsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_SESSIONS_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.fetchSessionsError).to.be.null;
  });
});