import { SingleSessionList } from './SingleSessionList';
import { CalendarTodayOutlined, TodayOutlined } from '@mui/icons-material';
import ReactFrappeChart from 'react-frappe-charts';
import { Box, Stack, Paper } from '@mui/material';
import React from 'react';
import { InfoBox } from './components/InfoBox';
import { selectMonthStatsByName } from './redux/selectMonthStatsByName';
import useAppSelector from 'hooks/useSelector';
import { toFrappeCharts } from 'features/timer/redux/toFrappeCharts';
import { selectDetailStats } from './redux/selectDetailStats';
import { useParams } from 'react-router-dom';
import { replace } from '@lagunovsky/redux-react-router';
import { useAppDispatch } from '@common/configStore';

function msToMinutes(ms: number) {
  return Math.floor(ms / (1000 * 60));
}

export const Overview = () => {
  const params = useParams<string>();
  const sessionName = params.sessionName;
  const dispatch = useAppDispatch();
  if (!sessionName) {
    return dispatch(replace('/'));
  }
  const data = useAppSelector((state) => selectMonthStatsByName(state, sessionName));
  const { weekTotal, monthTotal } = useAppSelector((state) =>
    selectDetailStats(state, sessionName),
  );
  const { labels, values } = toFrappeCharts(data);
  return (
    <Box pt={2} display="flex" flexDirection="column" flex={1} height="100%">
      <Stack spacing={2} direction="row" justifyContent="center">
        <InfoBox
          title="Week"
          amountInMinutes={msToMinutes(weekTotal)}
          Icon={CalendarTodayOutlined}
          variant="main"
        />
        <InfoBox
          title="Month"
          amountInMinutes={msToMinutes(monthTotal)}
          Icon={TodayOutlined}
          variant="secondary"
        />
      </Stack>
      <Paper sx={{ padding: 1, mt: 2 }}>
        <ReactFrappeChart
          type="bar"
          colors={['#21ba45']}
          axisOptions={{
            xAxisMode: 'tick',
            yAxisMode: 'tick',
            xIsSeries: 1,
          }}
          height={200}
          data={{
            labels,
            datasets: [{ values }],
          }}
        />
      </Paper>
      <Box my={2} width="100%" flex={1}>
        <Paper sx={{ height: '100%', width: '100%', padding: 2 }}>
          <SingleSessionList sessionName={sessionName} />
        </Paper>
      </Box>
    </Box>
  );
};
