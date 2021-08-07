import React from 'react';
import loadable from 'react-loadable';

export const LoadingComponent = () => (
  <h3
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      textTransform: 'uppercase',
    }}
  >
    Loading...
  </h3>
);

/**
 * Creates a react-loadable component.
 * You must provide a function that imports the required component
 * @param {() => any} importFn
 */
function makeAsyncPage(importFn) {
  return loadable({
    loader: importFn,
    loading: LoadingComponent,
  });
}

export default makeAsyncPage;
