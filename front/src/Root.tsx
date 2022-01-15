/* This is the Root component mainly initializes Redux and React Router. */

import React, { Suspense, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from './common/history';
import { LoadingComponent } from '@common/makeAsyncPage';
import { Route as route } from './types';

/**
 *
 *
 * @param {route[]} routes
 * @param {string} contextPath
 */
function renderRouteConfigV3(routes: route[], contextPath: string) {
  const children: ReactNode[] = []; // children component list
  const renderRoute = (item: route, routeContextPath: string) => {
    let newContextPath = /^\//.test(item.path) ? item.path : `${routeContextPath}/${item.path}`;
    newContextPath = newContextPath.replace(/\/+/g, '/');
    if (item.component && item.childRoutes) {
      const childRoutes = renderRouteConfigV3(item.childRoutes, newContextPath);
      const Component = item.component;
      children.push(
        <Route
          key={newContextPath}
          render={(props) => <Component {...props}>{childRoutes}</Component>}
          path={newContextPath}
          exact={item.exact}
        />,
      );
    } else if (item.component) {
      children.push(
        <Route key={newContextPath} component={item.component} path={newContextPath} exact />,
      );
    } else if (item.childRoutes) {
      item.childRoutes.forEach((r) => renderRoute(r, newContextPath));
    }
  };

  routes.forEach((item) => renderRoute(item, contextPath));

  // Use Switch so that only the first matched route is rendered.
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Switch>
        {children}
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  );
}

export default function Root({ routeConfig, store }: { routeConfig: route[]; store: any }) {
  const children = renderRouteConfigV3(routeConfig, '/');

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
  );
}
