import {
  HOME_CANCEL_EDIT_SESSION,
} from '../../../../src/features/home/redux/constants';

import {
  cancelEditSession,
  reducer,
} from '../../../../src/features/home/redux/cancelEditSession';

describe('home/redux/cancelEditSession', () => {
  it('returns correct action by cancelEditSession', () => {
    expect(cancelEditSession()).toHaveProperty('type', HOME_CANCEL_EDIT_SESSION);
  });

  it('handles action type HOME_CANCEL_EDIT_SESSION correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CANCEL_EDIT_SESSION }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {editing: false};
    expect(state).toEqual(expectedState);
  });
});
