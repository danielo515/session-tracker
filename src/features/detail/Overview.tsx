import { Typography } from '@mui/material';
import React from 'react';
import { InfoBox } from './components/InfoBox';

export const Overview = () => {
  return (
    <div>
      <Typography variant="h4" color="textPrimary">
        Title
      </Typography>
      <InfoBox />
    </div>
  );
};
