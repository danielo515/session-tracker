import React from 'react';
import { DatePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import TimePicker from '../common/TimePicker';
import { RenderTimer } from '../home/Timer';

import Page from '../common/Page';
// import PropTypes from 'prop-types';
import {} from './redux/hooks';
import { useEditRunningSession } from 'features/common/redux/editRunningSession';
import { Typography } from '@material-ui/core';
import useRunningSessionStats from './useRunningSessionStats';
import { msToHuman } from 'formatters/formatDateDiff';

export default function TimerTab() {
  const { runningSession } = useEditRunningSession();
  const setEndDate = date => {};
  const runningStats = useRunningSessionStats();
  if (!runningSession) return null;
  const dateStart = new Date(runningSession.startDate);
  const name = runningSession.name;
  return (
    <Page>
      <Box display="flex" justifyContent="space-between">
        <DatePicker value={dateStart} onChange={setEndDate} variant="inline" />
        <TimePicker id="time-picker-end" value={dateStart} onChange={setEndDate} />
      </Box>
      <Box
        display="flex"
        pt={4}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        fontSize="2rem"
        fontFamily="'Roboto',Monospace"
      >
        <RenderTimer startDate={dateStart.toISOString()} />
        <Typography>{name}</Typography>
      </Box>
      <StatRow title="Today" subtitle={msToHuman(runningStats.today)} />
      {runningStats.today !== runningStats.thisWeek && (
        <StatRow title="This week" subtitle={msToHuman(runningStats.thisWeek)} />
      )}
      {runningStats.today !== runningStats.thisMonth && (
        <StatRow title="This Month" subtitle={msToHuman(runningStats.thisMonth)} />
      )}
    </Page>
  );
}

TimerTab.propTypes = {};
TimerTab.defaultProps = {};

function StatRow({ title, subtitle }) {
  return (
    <Box
      display="flex"
      pt={4}
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Typography>{title}</Typography>
      <Typography>{subtitle}</Typography>
    </Box>
  );
}
