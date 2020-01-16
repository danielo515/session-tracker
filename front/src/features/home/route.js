import {
  DefaultPage,
  SessionsPage,
  NotImplemented,
} from './';

import {DefaultPage as  Dashboard} from '../stats'

export default {
  path: '/',
  name: 'Home',
  component: DefaultPage,
  childRoutes: [
    { path: 'timer', name: 'Default page', component: SessionsPage, isIndex: true, },
    { path: 'stats', name: 'Statistics', component: Dashboard},
    { path: 'not-implemented', name: 'Not implemented', component: NotImplemented },
  ],
};
