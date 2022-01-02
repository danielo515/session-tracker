import { App } from '../features/home';
import { PageNotFound } from '../features/common';
import homeRoute from '../features/home/route';
import commonRoute from '../features/common/route';
import loginRoute from '../features/login/route';
import timerRoute from '../features/timer/route';
import sessionDefinitionRoute from '../features/session-definition/route';
import { Route } from '@types';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.

const childRoutes: Route = [loginRoute, commonRoute, sessionDefinitionRoute, homeRoute, timerRoute];

const routes: Route = [
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

function handleIndexRoute(route: Route) {
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
