import React, { Suspense } from 'react';

const EditSessionComponent = React.lazy(() => import('./EditSession.container'));

const EditSession = () => (
  <Suspense fallback={null}>
    <EditSessionComponent />
  </Suspense>
);

export default EditSession;
