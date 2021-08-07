// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import makeAsyncPage from 'common/makeAsyncPage';

export default {
  path: 'stats',
  name: 'Stats',
  component: makeAsyncPage(() => import('./DefaultPage')),
};
