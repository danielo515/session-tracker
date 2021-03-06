import React from 'react';
import loadable from 'react-loadable';
import { DefaultPage, SessionsPage } from './';

const LoadingComponent = () => <h3>please wait...</h3>;
const DashboardPromise = () => {
  return import('../stats/DefaultPage');
};
const Dashboard = loadable({
  loader: DashboardPromise,
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
