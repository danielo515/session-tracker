import { CalendarTodayOutlined, TodayOutlined } from '@mui/icons-material';
import ReactFrappeChart from 'react-frappe-charts';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Box, Stack, List, Paper } from '@mui/material';
import React from 'react';
import { InfoBox } from './components/InfoBox';
import { DetailListItem } from './components/ListItem';
import { selectMonthStatsByName } from './redux/selectMonthStatsByName';
import useAppSelector from 'hooks/useSelector';

export const Overview = () => {
  const data = useAppSelector((state) => selectMonthStatsByName(state, { name: 'This site' }));
  const { labels, values } = Object.entries(data).reduce(
    ({ labels, values }, [key, value]) => {
      labels.push(key);
      values.push(value);
      return { labels, values };
    },
    {
      labels: [] as string[],
      values: [] as number[],
    },
  );
  return (
    <Box pt={2} display="flex" flexDirection="column" flex={1} height="100%">
      <Stack spacing={2} direction="row" justifyContent="center">
        <InfoBox title="Week" amountInMinutes={3000} Icon={CalendarTodayOutlined} variant="main" />
        <InfoBox title="Month" amountInMinutes={8000} Icon={TodayOutlined} variant="secondary" />
      </Stack>
      <Box>
        <ReactFrappeChart
          type="bar"
          colors={['#21ba45']}
          axisOptions={{ xAxisMode: 'tick', yAxisMode: 'tick', xIsSeries: 1 }}
          height={250}
          data={{
            labels,
            datasets: [{ values }],
          }}
        />
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
