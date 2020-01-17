import React from 'react';
import { shallow } from 'enzyme';
import { NotImplemented } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<NotImplemented />);
  expect(renderedComponent.find('.common-not-implemented').length).toBe(1);
});
