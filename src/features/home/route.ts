import { DefaultPage } from './DefaultPage';
import SettingsRoute from '../settings/route';
import StatsRoute from '../stats/route';
import TimerRoute from '../timer/route';
import makeAsyncPage from '@common/makeAsyncPage';
import { RouteObject } from 'react-router-dom';

const route: RouteObject = {
  path: '',
  element: DefaultPage,
  children: [
    {
      index: true,
      element: makeAsyncPage(() => {
        return import('./SessionsPage');
      }),
    },
    StatsRoute,
    SettingsRoute,
    TimerRoute,
  ],
};

export default route;
