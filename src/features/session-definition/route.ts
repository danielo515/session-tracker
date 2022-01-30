// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { RouteObject } from 'react-router-dom';
import { Create } from './';
import Update from './Update';

const route: RouteObject = {
  path: 'session-definitions',
  children: [
    { path: 'new', element: Create },
    { path: 'update/:sessionName', element: Update },
  ],
};

export default route;
