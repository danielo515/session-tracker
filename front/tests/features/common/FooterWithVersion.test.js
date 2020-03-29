import React from 'react';
import { shallow } from 'enzyme';
import { FooterWithVersion } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FooterWithVersion />);
  expect(renderedComponent.find('.common-footer-with-version').length).toBe(1);
});
