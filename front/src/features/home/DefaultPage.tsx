import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../common/Navigation';

export const DefaultPage = () => {
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      <Navigation page={pathname} />
      <Outlet />
    </React.Fragment>
  );
};

export default DefaultPage;
