import React, { isValidElement } from 'react';
import { App } from '../features/home';
import { PageNotFound } from '../features/common';
import homeRoute from '../features/home/route';
import commonRoute from '../features/common/route';
import loginRoute from '../features/login/route';
import timerRoute from '../features/timer/route';
import sessionDefinitionRoute from '../features/session-definition/route';
import { RouteObject } from 'react-router-dom';
import { ManageIcons } from 'features/Internal/manageIcons';
// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.

const childRoutes: RouteObject[] = [
  ...loginRoute,
  commonRoute,
  sessionDefinitionRoute,
  homeRoute,
  timerRoute,
  { path: 'internal', element: ManageIcons },
];

export const renderRoutes = (routes): RouteObject[] => {
  return routes.map((route) => {
    if (route.children) route.children = renderRoutes(route.children);
    if (!route.element || isValidElement(route.element)) return route;
    const Element = route.element;
    return {
      ...route,
      element: <Element />,
    };
  });
};

const routes = [
  {
    path: '/',
    element: App,
    children: [...childRoutes, { path: '*', element: PageNotFound }],
  },
];

export default routes;
