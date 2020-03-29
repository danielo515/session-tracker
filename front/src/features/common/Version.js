import React from 'react';
import Typography from '@material-ui/core/Typography';
export function Version() {
  return (<Typography variant="body2" color="textSecondary" align="center">
    Ver: {process.env.APP_VERSION}
  </Typography>);
}
