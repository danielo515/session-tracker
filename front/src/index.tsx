import React from 'react';
import { render } from 'react-dom';
import './fb';
import store from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';

function renderApp(app) {
  render(<React.StrictMode>{app}</React.StrictMode>, document.getElementById('root'));
}

renderApp(<Root store={store} routeConfig={routeConfig} />);
