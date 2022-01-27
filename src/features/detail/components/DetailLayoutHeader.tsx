import { ArrowBack } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';

export const DetailLayoutHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton aria-label="back" color="inherit">
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">Title</Typography>
      </Toolbar>
    </AppBar>
  );
};
