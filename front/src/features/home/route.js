import { DefaultPage } from './DefaultPage';
import SettingsRoute from '../settings/route';
import StatsRoute from '../stats/route';
import TimerRoute from '../timer/route';
import makeAsyncPage from '@common/makeAsyncPage';

export default {
  path: '/',
  name: 'Home',
  component: DefaultPage,
  childRoutes: [
    {
      path: 'list',
      name: 'Default page',
      component: makeAsyncPage(() => {
        return import('./SessionsPage');
      }),
      isIndex: true,
    },
    StatsRoute,
    SettingsRoute,
    TimerRoute,
  ],
};
