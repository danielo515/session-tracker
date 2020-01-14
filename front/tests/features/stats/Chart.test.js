import React from 'react';
import { shallow } from 'enzyme';
import { Chart } from '../../../src/features/stats';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Chart />);
  expect(renderedComponent.find('.stats-chart').length).toBe(1);
});
