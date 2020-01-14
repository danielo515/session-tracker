import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../../src/features/stats';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Dashboard />);
  expect(renderedComponent.find('.stats-dashboard').length).toBe(1);
});
