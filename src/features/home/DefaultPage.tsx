import { LoadingComponent } from '@common/makeAsyncPage';
import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../common/Navigation';

export const DefaultPage = () => {
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      <Navigation page={pathname} />

      <Suspense fallback={<LoadingComponent />}>
        <Outlet />
      </Suspense>
    </React.Fragment>
  );
};

export default DefaultPage;
