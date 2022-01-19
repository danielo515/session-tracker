import {
  HOME_SELECT_ROW,
} from '../../../../src/features/home/redux/constants';

import {
  selectRow,
  reducer,
} from '../../../../src/features/home/redux/selectRow';

describe('home/redux/selectRow', () => {
  it('returns correct action by selectRow', () => {
    expect(selectRow()).toHaveProperty('type', HOME_SELECT_ROW);
  });

  it('handles action type HOME_SELECT_ROW correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SELECT_ROW }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
