import {
  DefaultPage,
  NotImplemented,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
    { path: 'not-implemented', name: 'Not implemented', component: NotImplemented },
  ],
};
