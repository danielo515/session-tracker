import React from 'react';
import { shallow } from 'enzyme';
import { Title } from '../../../src/features/stats';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Title />);
  expect(renderedComponent.find('.stats-title').length).toBe(1);
});
