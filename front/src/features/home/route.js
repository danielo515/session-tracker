import { DefaultPage } from './DefaultPage';
import SettingsRoute from '../settings/route';
import StatsRoute from '../stats/route';
import makeAsyncPage from 'common/makeAsyncPage';

export default {
  path: '/',
  name: 'Home',
  component: DefaultPage,
  childRoutes: [
    {
      path: 'timer',
      name: 'Default page',
      component: makeAsyncPage(() => {
        return import('./SessionsPage');
      }),
      isIndex: true,
    },
    StatsRoute,
    SettingsRoute,
  ],
};
