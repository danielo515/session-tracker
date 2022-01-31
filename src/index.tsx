import React from 'react';
import { render } from 'react-dom';
import './fb';
import store from 'common/configStore';
import Root from './Root';
import ReloadPrompt from 'ReloadPrompt';

render(
  <React.StrictMode>
    <Root store={store} />
    <ReloadPrompt />
  </React.StrictMode>,
  document.getElementById('root'),
);
