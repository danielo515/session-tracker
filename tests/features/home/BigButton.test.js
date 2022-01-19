import React from 'react';
import { shallow } from 'enzyme';
import { BigButton } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<BigButton />);
  expect(renderedComponent.find('.home-big-button').length).toBe(1);
});
