// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import { LoginDefaultPage } from './';

export default {
  path: 'login',
  children: [
    { index: true, element: LoginDefaultPage },
    { path: 'signup', element: LoginDefaultPage },
  ],
};
