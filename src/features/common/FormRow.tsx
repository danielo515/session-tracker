import { Box } from '@mui/material';
import React from 'react';

export default function FormRow({
  children,
  centered,
  row,
}: {
  children: React.ReactNode;
  centered?: boolean;
  row?: boolean;
}) {
  const props = {
    alignItems: centered ? 'center' : 'stretch',
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: row ? 'row' : 'column',
  };
  return (
    <Box pt={2} sx={props}>
      {children}
    </Box>
  );
}
