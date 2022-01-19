import React, { Suspense } from 'react';

const EditSessionComponent = React.lazy(() => import('./EditSession.container'));

const LoadingComponent = () => <h3>please wait...</h3>;
const EditSession = () => (
  <Suspense fallback={<LoadingComponent />}>
    <EditSessionComponent />
  </Suspense>
);

export default EditSession;
