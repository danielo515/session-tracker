import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  LOGIN_SIGN_UP_BEGIN,
  LOGIN_SIGN_UP_SUCCESS,
  LOGIN_SIGN_UP_FAILURE,
  LOGIN_SIGN_UP_DISMISS_ERROR,
} from 'src/features/login/redux/constants';

import {
  signUp,
  dismissSignUpError,
  reducer,
} from 'src/features/login/redux/signUp';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login/redux/signUp', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when signUp succeeds', () => {
    const store = mockStore({});

    return store.dispatch(signUp())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', LOGIN_SIGN_UP_BEGIN);
        expect(actions[1]).to.have.property('type', LOGIN_SIGN_UP_SUCCESS);
      });
  });

  it('dispatches failure action when signUp fails', () => {
    const store = mockStore({});

    return store.dispatch(signUp({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', LOGIN_SIGN_UP_BEGIN);
        expect(actions[1]).to.have.property('type', LOGIN_SIGN_UP_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissSignUpError', () => {
    const expectedAction = {
      type: LOGIN_SIGN_UP_DISMISS_ERROR,
    };
    expect(dismissSignUpError()).to.deep.equal(expectedAction);
  });

  it('handles action type LOGIN_SIGN_UP_BEGIN correctly', () => {
    const prevState = { signUpPending: false };
    const state = reducer(
      prevState,
      { type: LOGIN_SIGN_UP_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.signUpPending).to.be.true;
  });

  it('handles action type LOGIN_SIGN_UP_SUCCESS correctly', () => {
    const prevState = { signUpPending: true };
    const state = reducer(
      prevState,
      { type: LOGIN_SIGN_UP_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.signUpPending).to.be.false;
  });

  it('handles action type LOGIN_SIGN_UP_FAILURE correctly', () => {
    const prevState = { signUpPending: true };
    const state = reducer(
      prevState,
      { type: LOGIN_SIGN_UP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.signUpPending).to.be.false;
    expect(state.signUpError).to.exist;
  });

  it('handles action type LOGIN_SIGN_UP_DISMISS_ERROR correctly', () => {
    const prevState = { signUpError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: LOGIN_SIGN_UP_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.signUpError).to.be.null;
  });
});