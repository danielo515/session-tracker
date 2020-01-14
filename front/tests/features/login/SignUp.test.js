import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from '../../../src/features/login/SignUp';

describe('login/SignUp', () => {
  it('renders node with correct class name', () => {
    const props = {
      login: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SignUp {...props} />
    );

    expect(
      renderedComponent.find('.login-sign-up').length
    ).toBe(1);
  });
});
