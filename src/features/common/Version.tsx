import React from 'react';
import Typography from '@mui/material/Typography';
export function Version() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Ver: {process.env.APP_VERSION}
    </Typography>
  );
}
