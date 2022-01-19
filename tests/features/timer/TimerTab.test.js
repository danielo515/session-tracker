import React from 'react';
import { shallow } from 'enzyme';
import { TimerTab } from '../../../src/features/timer/TimerTab';

describe('timer/TimerTab', () => {
  it('renders node with correct class name', () => {
    const props = {
      timer: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TimerTab {...props} />
    );

    expect(
      renderedComponent.find('.timer-timer-tab').length
    ).toBe(1);
  });
});
