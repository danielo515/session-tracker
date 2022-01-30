import { useAppDispatch } from '@common/configStore';
import { push } from '@lagunovsky/redux-react-router';
import { ArrowBack } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

export const DetailLayoutHeader = () => {
  const params = useParams<string>();
  const dispatch = useAppDispatch();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton aria-label="back" color="inherit" onClick={() => dispatch(push('/'))}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">{params.sessionName}</Typography>
      </Toolbar>
    </AppBar>
  );
};
