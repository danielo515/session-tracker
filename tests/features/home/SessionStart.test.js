import React from 'react';
import { shallow } from 'enzyme';
import { SessionStart } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SessionStart />);
  expect(renderedComponent.find('.home-session-controls').length).toBe(1);
});
