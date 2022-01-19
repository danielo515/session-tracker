import React from 'react';

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
function makeAsyncPage(importFn: () => any) {
  return React.lazy(importFn);
}

export default makeAsyncPage;
