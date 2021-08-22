import { Box } from '@material-ui/core';
import React from 'react';

/**
 *
 *
 * @export
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} [ props.centered ]
 * @return {*}
 */
export default function FormRow({ children, centered }) {
  const props = {
    alignItems: centered ? 'center' : 'flex-start',
  };
  return (
    <Box pt={2} {...props}>
      {children}
    </Box>
  );
}
