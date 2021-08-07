import React from 'react';
import loadable from 'react-loadable';

const LoadingComponent = () => <h3>please wait...</h3>;
const EditSessionPromise = () => {
  return import('./EditSession.container');
};
const EditSession = loadable({
  loader: EditSessionPromise,
  loading: LoadingComponent,
});

export default EditSession;
