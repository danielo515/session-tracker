import Update from 'features/session-definition/Update';
import { DetailLayout } from './DetalLayout';
import { Overview } from './Overview';

export const detailRoutes = {
  path: 'detail',
  element: DetailLayout,
  children: [
    { path: ':sessionName', element: Overview },
    { path: ':sessionName/edit', element: Update },
  ],
};
