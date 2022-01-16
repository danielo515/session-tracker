/* This is the Root component mainly initializes Redux and React Router. */

import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { RouteObject, useRoutes } from 'react-router-dom';
import { ReduxRouter } from '@lagunovsky/redux-react-router';
import history from './common/history';
import { LoadingComponent } from '@common/makeAsyncPage';
import { Store } from '@reduxjs/toolkit';
import routes from '@common/routeConfig';

function RenderRouteConfig({ routes }: { routes: RouteObject[] }) {
  const children = useRoutes(routes);
  console.log({ routes });
  return <Suspense fallback={<LoadingComponent />}>{children}</Suspense>;
}

export default function Root({ store }: { store: Store }) {
  return (
    <Provider store={store}>
      <ReduxRouter history={history} store={store}>
        <RenderRouteConfig routes={routes()} />
      </ReduxRouter>
    </Provider>
  );
}
