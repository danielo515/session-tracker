import React from 'react';
import { App } from '../features/home';
import { PageNotFound } from '../features/common';
import homeRoute from '../features/home/route';
import commonRoute from '../features/common/route';
import loginRoute from '../features/login/route';
import timerRoute from '../features/timer/route';
import sessionDefinitionRoute from '../features/session-definition/route';
import { RouteObject } from 'react-router-dom';
// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.

const childRoutes = [loginRoute, commonRoute, sessionDefinitionRoute, homeRoute, timerRoute];

const renderRoutes = (routes) => {
  return routes.map((route) => {
    if (route.children) route.children = renderRoutes(route.children);
    if (!route.element) return route;
    const Element = route.element;
    return {
      ...route,
      element: <Element />,
    };
  });
};

const routes = (): RouteObject[] => [
  {
    path: '/',
    element: <App />,
    children: renderRoutes([...childRoutes, { path: '*', element: PageNotFound }]),
  },
];

export default routes;
