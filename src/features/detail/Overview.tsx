import { CalendarTodayOutlined, TodayOutlined } from '@mui/icons-material';
import { Box, Typography, Stack } from '@mui/material';
import React from 'react';
import { InfoBox } from './components/InfoBox';

export const Overview = () => {
  return (
    <Box pt={2}>
      <Typography variant="h4" color="textPrimary" my={2}>
        Title
      </Typography>
      <Stack spacing={2} direction="row" justifyContent="center">
        <InfoBox title="Week" amountInMinutes={3000} Icon={CalendarTodayOutlined} />
        <InfoBox title="Month" amountInMinutes={8000} Icon={TodayOutlined} />
      </Stack>
    </Box>
  );
};
