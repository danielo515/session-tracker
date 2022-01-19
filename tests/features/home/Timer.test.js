import React from 'react';
import { shallow } from 'enzyme';
import { Timer } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Timer />);
  expect(renderedComponent.find('.home-timer').length).toBe(1);
});
