import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import './fb';
import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';

const store = configStore();

function renderApp(app: any) {
  render(<AppContainer>{app}</AppContainer>, document.getElementById('root'));
}

console.log('Eres un puto reputo super puto');

renderApp(<Root store={store} routeConfig={routeConfig} />);
// Hot Module Replacement API
/* istanbul ignore if  */
if ((module as any).hot) {
  (module as any).hot.accept('./common/routeConfig', () => {
    const nextRouteConfig = require('./common/routeConfig').default; // eslint-disable-line
    renderApp(<Root store={store} routeConfig={nextRouteConfig} />);
  });
  (module as any).hot.accept('./Root', () => {
    const nextRoot = require('./Root').default; // eslint-disable-line
    renderApp(<Root store={store} routeConfig={routeConfig} />);
  });
}
