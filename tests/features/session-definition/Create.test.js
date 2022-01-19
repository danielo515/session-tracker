import React from 'react';
import { shallow } from 'enzyme';
import { Create } from '../../../src/features/session-definition/Create';

describe('session-definition/Create', () => {
  it('renders node with correct class name', () => {
    const props = {
      sessionDefinition: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Create {...props} />
    );

    expect(
      renderedComponent.find('.session-definition-create').length
    ).toBe(1);
  });
});
