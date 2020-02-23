import {
  HOME_EDIT_SESSION,
} from '../../../../src/features/home/redux/constants';

import {
  editSession,
  reducer,
} from '../../../../src/features/home/redux/editSession';

describe('home/redux/editSession', () => {
  it('returns correct action by editSession', () => {
    expect(editSession()).toHaveProperty('type', HOME_EDIT_SESSION);
  });

  it('handles action type HOME_EDIT_SESSION correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_EDIT_SESSION }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
