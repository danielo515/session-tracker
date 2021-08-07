import React from 'react';
import { AppContainer } from 'react-hot-loader';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { render } from 'react-dom';
import './fb';
import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
const store = configStore();

function renderApp(app: any) {
  render(<AppContainer>{app}</AppContainer>, document.getElementById('root'));
}

renderApp(<Root store={store} routeConfig={routeConfig} />);
// Hot Module Replacement API
/* istanbul ignore if  */
if ((module as any).hot) {
  (module as any).hot.accept('./common/routeConfig', () => {
    const nextRouteConfig = require('./common/routeConfig').default; // eslint-disable-line
    renderApp(<Root store={store} routeConfig={nextRouteConfig}/>);
});
  (module as any).hot.accept('./Root', () => {
    const nextRoot = require('./Root').default; // eslint-disable-line
    renderApp(<Root store={store} routeConfig={routeConfig}/>);
});
}
