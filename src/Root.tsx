/* This is the Root component mainly initializes Redux and React Router. */

import React, { Suspense, useMemo } from 'react';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { ReduxRouter } from '@lagunovsky/redux-react-router';
import history from 'common/history';
import { LoadingComponent } from '@common/makeAsyncPage';
import { Store } from '@reduxjs/toolkit';
import routes, { renderRoutes, RouteConfig } from '@common/routeConfig';

// This ridiculous separation is needed because useRoutes can only be used inside
// the scope of a Router provider
function RenderRouteConfig() {
  const memoizedRoutes = useMemo(() => renderRoutes(routes as RouteConfig[]), []);
  const children = useRoutes(memoizedRoutes);
  return <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
}

export default function Root({ store }: { store: Store }) {
  return (
    <Provider store={store}>
      <ReduxRouter history={history} store={store}>
        <RenderRouteConfig />
      </ReduxRouter>
    </Provider>
  );
}
