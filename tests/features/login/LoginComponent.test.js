import React from 'react';
import { shallow } from 'enzyme';
import { LoginComponent } from '../../../src/features/login';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<LoginComponent />);
  expect(renderedComponent.find('.login-login-component').length).toBe(1);
});
