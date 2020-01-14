import React from 'react';
import { shallow } from 'enzyme';
import { SessionController } from '../../../src/features/home/SessionController';

describe('home/SessionController', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SessionController {...props} />
    );

    expect(
      renderedComponent.find('.home-session-controller').length
    ).toBe(1);
  });
});
