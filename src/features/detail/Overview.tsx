import { CalendarTodayOutlined, TodayOutlined } from '@mui/icons-material';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Box, Stack, List, Paper } from '@mui/material';
import React from 'react';
import { InfoBox } from './components/InfoBox';
import { DetailListItem } from './components/ListItem';

export const Overview = () => {
  return (
    <Box pt={2} display="flex" flexDirection="column" flex={1} height="100%">
      <Stack spacing={2} direction="row" justifyContent="center">
        <InfoBox title="Week" amountInMinutes={3000} Icon={CalendarTodayOutlined} variant="main" />
        <InfoBox title="Month" amountInMinutes={8000} Icon={TodayOutlined} variant="secondary" />
      </Stack>
      <Box>
        <h1>Graph</h1>
      </Box>
      <Box my={2} width="100%" flex={1}>
        <Paper sx={{ height: '100%', width: '100%', padding: 2 }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                sx={{
                  overflow: 'scroll',
                  height,
                  width,
                  paddingTop: 0,
                  '& li:first-of-type': { margin: 0 },
                }}
              >
                <DetailListItem />
                <DetailListItem />
                <DetailListItem />
                <DetailListItem />
                <DetailListItem />
                <DetailListItem />
              </List>
            )}
          </AutoSizer>
        </Paper>
      </Box>
    </Box>
  );
};
