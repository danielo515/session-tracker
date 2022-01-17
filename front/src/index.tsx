import React from 'react';
import { render } from 'react-dom';
import './fb';
import store from './common/configStore';
import Root from './Root';

render(
  <React.StrictMode>
    <Root store={store} />
  </React.StrictMode>,
  document.getElementById('root'),
);
