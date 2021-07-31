import {
  TIMER_OPEN_EDIT,
} from '../../../../src/features/timer/redux/constants';

import {
  openEdit,
  reducer,
} from '../../../../src/features/timer/redux/openEdit';

describe('timer/redux/openEdit', () => {
  it('returns correct action by openEdit', () => {
    expect(openEdit()).toHaveProperty('type', TIMER_OPEN_EDIT);
  });

  it('handles action type TIMER_OPEN_EDIT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TIMER_OPEN_EDIT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
