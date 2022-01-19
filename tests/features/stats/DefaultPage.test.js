import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/stats/DefaultPage';

describe('stats/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      stats: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.stats-default-page').length
    ).toBe(1);
  });
});
