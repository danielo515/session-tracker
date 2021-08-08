import React from 'react';
import { shallow } from 'enzyme';
import { QuickPick } from '../../../src/features/common/QuickPick';

describe('common/QuickPick', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <QuickPick {...props} />
    );

    expect(
      renderedComponent.find('.common-quick-pick').length
    ).toBe(1);
  });
});
