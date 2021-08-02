import React from 'react';
import Box from '@material-ui/core/Box';
import { RenderTimer } from '../home/Timer';

import Page from '../common/Page';
// import PropTypes from 'prop-types';
import {} from './redux/hooks';
import { useEditRunningSession } from 'features/common/redux/editRunningSession';
import { Button, Card, IconButton, Typography } from '@material-ui/core';
import useRunningSessionStats from './useRunningSessionStats';
import { msToHuman } from 'formatters/formatDateDiff';
import format from 'date-fns/format';
import EditIcon from '@material-ui/icons/Edit';
import StopIcon from '@material-ui/icons/Stop';
// import FastRewindIcon from '@material-ui/icons/FastRewind';
import { subMinutes } from 'date-fns';
import { Replay, Replay30, Replay5 } from '@material-ui/icons';
import { useStopRunningSession } from 'features/common/redux/useStopRunningSession';
/**
 * Renders a date with a edit icon
 * @param {Object} props
 * @param {Date} props.startDate
 */
function Started({ startDate }) {
  const formattedDate = format(startDate, 'E. HH:mm');

  return (
    <Box>
      <Typography variant="h6">Started:</Typography>
      <Box display="flex" flexDirection="row" alignItems="flex-start">
        <Box fontSize="1.125rem" lineHeight="1.125rem" padding="3px" clone>
          <Typography variant="subtitle1">{formattedDate}</Typography>
        </Box>
        <IconButton size="small">
          <Box fontSize="1.125rem" clone>
            <EditIcon />
          </Box>
        </IconButton>
      </Box>
    </Box>
  );
}

export default function TimerTab() {
  const { runningSession, editRunningSession } = useEditRunningSession();
  const { stopRunningSession } = useStopRunningSession();
  const resetSession = () =>
    editRunningSession({ name: runningSession?.name, startDate: new Date() });
  const minus5min = () =>
    editRunningSession({
      name: runningSession?.name,
      startDate: subMinutes(new Date(runningSession?.startDate), 5),
    });
  const minus30min = () =>
    editRunningSession({
      name: runningSession?.name,
      startDate: subMinutes(new Date(runningSession?.startDate), 30),
    });
  const runningStats = useRunningSessionStats();
  if (!runningSession) return null;
  const dateStart = new Date(runningSession.startDate);
  const name = runningSession.name;
  return (
    <Page>
      <Box
        display="flex"
        pt={4}
        pb={2}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        fontSize="2rem"
        fontFamily="'Roboto',Monospace"
      >
        <RenderTimer startDate={dateStart.toISOString()} />
        <Typography>{name}</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Started startDate={dateStart} />
      </Box>
      <Box display="flex" justifyContent="space-around">
        <StatRow title="Today" subtitle={msToHuman(runningStats.today)} />
        <StatRow title="Week" subtitle={msToHuman(runningStats.thisWeek)} />
        <StatRow title="Month" subtitle={msToHuman(runningStats.thisMonth)} />
      </Box>
      <Box display="flex" justifyContent="space-around" alignItems="center" pt={4} p={3}>
        <ButtonAction onClick={resetSession} icon={<Replay />} />
        <ButtonAction onClick={minus5min} icon={<Replay5 />} />
        <ButtonAction onClick={minus30min} icon={<Replay30 />} />
        <ButtonAction
          icon={<StopIcon />}
          color="secondary"
          onClick={stopRunningSession}
        ></ButtonAction>
      </Box>
    </Page>
  );
}

TimerTab.propTypes = {};
TimerTab.defaultProps = {};

function StatRow({ title, subtitle }) {
  return (
    <Box pt={2}>
      <Card>
        <Box
          display="flex"
          p={1}
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Typography variant="h6">{title}</Typography>
          <Box pl={1}>
            <Typography variant="body2">{subtitle}</Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

/**
 * Renders a button with a label
 * @param {Object} props
 * @param {('primary'|'secondary')} [ props.color ]
 * @param {import('react').ReactNode} props.icon
 * @param {import('react').ReactEventHandler} props.onClick
 **/
function ButtonAction({ onClick, icon, color = 'primary' }) {
  return (
    <Button variant="outlined" color={color} onClick={onClick} size="large">
      <Box fontSize="2rem" clone>
        {icon}
      </Box>
    </Button>
  );
}
