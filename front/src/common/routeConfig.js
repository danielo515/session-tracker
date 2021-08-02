import { App } from '../features/home';
import { PageNotFound } from '../features/common';
import homeRoute from '../features/home/route';
import commonRoute from '../features/common/route';
import loginRoute from '../features/login/route';
import timerRoute from '../features/timer/route';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.
/** @typedef { import('@types').Route } Route*/
/** @type {Route[]}*/
const childRoutes = [loginRoute, commonRoute, homeRoute, timerRoute];

/** @type { import('../types').Route[] }*/
const routes = [
  {
    path: '/',
    component: App,
    name: 'root',
    childRoutes: [
      { path: 'not-found', name: 'Page not found', component: PageNotFound },
      ...childRoutes,
    ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
  },
];

// Handle isIndex property of route config:
//  Duplicate it and put it as the first route rule.

/**
 *
 *
 * @param {Route} route
 */
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = route.childRoutes.find(child => child.isIndex);
  if (indexRoute) {
    const first = {
      ...indexRoute,
      exact: true,
      autoIndexRoute: true, // mark it so that the simple nav won't show it.
      path: '',
    };
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
console.log({ routes });
export default routes;
