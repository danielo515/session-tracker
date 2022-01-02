import { Box } from '@material-ui/core';
import React from 'react';

/**
 *
 *
 * @export
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} [ props.centered ]
 * @param {boolean} [ props.row ]
 * @return {*}
 */
export default function FormRow({ children, centered, row }) {
  const props = {
    alignItems: centered ? 'center' : 'stretch',
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: row ? 'row' : 'column',
  };
  return (
    <Box pt={2} {...props}>
      {children}
    </Box>
  );
}
