import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import {
  HOME_SWITCH_TASK_BEGIN,
  HOME_SWITCH_TASK_SUCCESS,
  HOME_SWITCH_TASK_FAILURE,
  HOME_SWITCH_TASK_DISMISS_ERROR,
} from 'src/features/home/redux/constants';

import {
  switchTask,
  dismissSwitchTaskError,
  reducer,
} from 'src/features/home/redux/switchTask';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/switchTask', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when switchTask succeeds', () => {
    const store = mockStore({});

    return store.dispatch(switchTask())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_SWITCH_TASK_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_SWITCH_TASK_SUCCESS);
      });
  });

  it('dispatches failure action when switchTask fails', () => {
    const store = mockStore({});

    return store.dispatch(switchTask({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).to.have.property('type', HOME_SWITCH_TASK_BEGIN);
        expect(actions[1]).to.have.property('type', HOME_SWITCH_TASK_FAILURE);
        expect(actions[1]).to.have.nested.property('data.error').that.exist;
      });
  });

  it('returns correct action by dismissSwitchTaskError', () => {
    const expectedAction = {
      type: HOME_SWITCH_TASK_DISMISS_ERROR,
    };
    expect(dismissSwitchTaskError()).to.deep.equal(expectedAction);
  });

  it('handles action type HOME_SWITCH_TASK_BEGIN correctly', () => {
    const prevState = { switchTaskPending: false };
    const state = reducer(
      prevState,
      { type: HOME_SWITCH_TASK_BEGIN }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.switchTaskPending).to.be.true;
  });

  it('handles action type HOME_SWITCH_TASK_SUCCESS correctly', () => {
    const prevState = { switchTaskPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SWITCH_TASK_SUCCESS, data: {} }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.switchTaskPending).to.be.false;
  });

  it('handles action type HOME_SWITCH_TASK_FAILURE correctly', () => {
    const prevState = { switchTaskPending: true };
    const state = reducer(
      prevState,
      { type: HOME_SWITCH_TASK_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.switchTaskPending).to.be.false;
    expect(state.switchTaskError).to.exist;
  });

  it('handles action type HOME_SWITCH_TASK_DISMISS_ERROR correctly', () => {
    const prevState = { switchTaskError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_SWITCH_TASK_DISMISS_ERROR }
    );
    expect(state).to.not.equal(prevState); // should be immutable
    expect(state.switchTaskError).to.be.null;
  });
});