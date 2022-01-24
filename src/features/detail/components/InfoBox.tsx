import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { styled } from '@mui/material';

const Root = styled(Box)`
  border: 1px solid tomato;
  background-color: 'primary.main';
  border-radius: 5px;
  display: flex;
`;

export const InfoBox = () => {
  return (
    <Root>
      <Typography variant="subtitle1" color="secondary">
        Week
      </Typography>
    </Root>
  );
};
