/* This is the Root component mainly initializes Redux and React Router. */

import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from './common/history';

/** @typedef { import('./types').Route } route*/

/**
 *
 *
 * @param {route[]} routes
 * @param {string} contextPath
 */
function renderRouteConfigV3(routes: any, contextPath: any) {
  // Resolve route config object in React Router v3.
  /** @type { import('react').ReactNodeArray }*/
  const children: any = []; // children component list
  /**
   * @param {route} item
   * @param {string} routeContextPath
   */
  const renderRoute = (item: any, routeContextPath: any) => {
    let newContextPath = /^\//.test(item.path) ? item.path : `${routeContextPath}/${item.path}`;
    newContextPath = newContextPath.replace(/\/+/g, '/');
    if (item.component && item.childRoutes) {
      const childRoutes = renderRouteConfigV3(item.childRoutes, newContextPath);
      children.push(
        <Route
          key={newContextPath}
          render={props => <item.component {...props}>{childRoutes}</item.component>}
          path={newContextPath}
          exact={item.exact}
        />,
      );
    } else if (item.component) {
      children.push(
        <Route key={newContextPath} component={item.component} path={newContextPath} exact />,
      );
    } else if (item.childRoutes) {
      item.childRoutes.forEach((r: any) => renderRoute(r, newContextPath));
    }
  };

  routes.forEach((item: any) => renderRoute(item, contextPath));

  // Use Switch so that only the first matched route is rendered.
  return (
    <Switch>
      {children}
      <Redirect to="/not-found" />
    </Switch>
  );
}

type Props = {
    store: any;
    routeConfig: any[];
};

export default class Root extends React.Component<Props> {
  render() {
    const children = renderRouteConfigV3(this.props.routeConfig, '/');

    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Provider>
    );
  }
}
