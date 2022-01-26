import Update from 'features/session-definition/Update';
import { DetailLayout } from './DetalLayout';
import { Overview } from './Overview';

export const detailRoutes = {
  path: 'detail',
  element: DetailLayout,
  children: [
    { index: true, element: Overview },
    { path: 'detail/:name', element: Update },
  ],
};
