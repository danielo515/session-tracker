// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import { DefaultPage } from './';

export default {
  path: 'login',
  name: 'Login',
  component: DefaultPage,
  childRoutes: [{ path: 'signup', name: 'Sign up', component: DefaultPage }],
};
