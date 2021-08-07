import makeAsyncPage from 'common/makeAsyncPage';
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

export default {
  path: 'timer',
  name: 'timer',
  component: makeAsyncPage(() => import('./TimerTab')),
};
