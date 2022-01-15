import { DefaultPage } from './DefaultPage';
import SettingsRoute from '../settings/route';
import StatsRoute from '../stats/route';
import TimerRoute from '../timer/route';
import makeAsyncPage from '@common/makeAsyncPage';
import SessionsPage from './SessionsPage';

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
      }) as (props: Parameters<typeof SessionsPage>) => JSX.Element,
      isIndex: true,
    },
    StatsRoute,
    SettingsRoute,
    TimerRoute,
  ],
};
