import React from 'react';
import { shallow } from 'enzyme';
import { SessionStop } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SessionStop />);
  expect(renderedComponent.find('.home-session-stop').length).toBe(1);
});
