import React from 'react';
import loadable from 'react-loadable';
import { DefaultPage } from './';

const LoadingComponent = () => (
  <h3
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      textTransform: 'uppercase',
    }}
  >
    Loading...
  </h3>
);
const DashboardPromise = () => {
  return import('../stats/DefaultPage');
};
const Dashboard = loadable({
  loader: DashboardPromise,
  loading: LoadingComponent,
});

const SessionsPromise = () => {
  return import('./SessionsPage');
};

const SessionsPage = loadable({
  loader: SessionsPromise,
  loading: LoadingComponent,
});

export default {
  path: '/',
  name: 'Home',
  component: DefaultPage,
  childRoutes: [
    { path: 'timer', name: 'Default page', component: SessionsPage, isIndex: true },
    { path: 'stats', name: 'Statistics', component: Dashboard },
  ],
};
