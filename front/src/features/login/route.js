// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  DefaultPage,
} from './';

export default {
  path: 'login',
  name: 'Login',
  childRoutes: [
    { path: 'login', name: 'login', component: DefaultPage, isIndex: true },
    { path: 'signup', name: 'Sign up', component: DefaultPage },
  ],
};
