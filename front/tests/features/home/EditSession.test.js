import React from 'react';
import { shallow } from 'enzyme';
import { EditSession } from '../../../src/features/home/EditSession';

describe('home/EditSession', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EditSession {...props} />
    );

    expect(
      renderedComponent.find('.home-edit-session').length
    ).toBe(1);
  });
});
