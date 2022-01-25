import makeAsyncPage from '@common/makeAsyncPage';

export default {
  path: 'stats',
  element: makeAsyncPage(() => import('./StatsDefaultPage')),
};
