import React from 'react';
import { shallow } from 'enzyme';
import { SettingsPage } from '../../../src/features/settings/SettingsPage';

describe('settings/SettingsPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      settings: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SettingsPage {...props} />
    );

    expect(
      renderedComponent.find('.settings-settings-page').length
    ).toBe(1);
  });
});
