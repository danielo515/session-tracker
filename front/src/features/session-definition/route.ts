// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { Create } from './';
import Update from './Update';

export default {
  path: 'session-definitions',
  name: 'definitions',
  childRoutes: [
    { path: 'new', component: Create, name: 'create definition' },
    { path: 'update/:name', component: Update, name: 'update definition' },
  ],
};
