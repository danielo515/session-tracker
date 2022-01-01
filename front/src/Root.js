/* This is the Root component mainly initializes Redux and React Router. */

import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from './common/history';
import { LoadingComponent } from '@common/makeAsyncPage';

/** @typedef { import('./types').Route } route*/

/**
 *
 *
 * @param {route[]} routes
 * @param {string} contextPath
 */
function renderRouteConfigV3(routes, contextPath) {
  // Resolve route config object in React Router v3.
  /** @type { import('react').ReactNodeArray }*/
  const children = []; // children component list
  /**
   * @param {route} item
   * @param {string} routeContextPath
   */
  const renderRoute = (item, routeContextPath) => {
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
      item.childRoutes.forEach(r => renderRoute(r, newContextPath));
    }
  };

  routes.forEach(item => renderRoute(item, contextPath));

  // Use Switch so that only the first matched route is rendered.
  return (
    <Switch>
      <Suspense fallback={<LoadingComponent />}>{children}</Suspense>
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routeConfig: PropTypes.array.isRequired,
  };
  render() {
    const children = renderRouteConfigV3(this.props.routeConfig, '/');

    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Provider>
    );
  }
}
