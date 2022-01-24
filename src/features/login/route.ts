import React from 'react';

export default [
  { path: 'login', element: React.lazy(() => import('./LoginDefaultPage')) },
  { path: 'signup', element: React.lazy(() => import('./LoginDefaultPage')) },
];
