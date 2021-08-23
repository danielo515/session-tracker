import React from 'react';
import Box from '@material-ui/core/Box';
import { RenderTimer } from '../home/Timer';

import Page from '../common/Page';
// import PropTypes from 'prop-types';
import {} from './redux/hooks';
import { useEditRunningSession } from 'features/common/redux/editRunningSession';
import { Button, Card, Grid, IconButton, Typography } from '@material-ui/core';
import useRunningSessionStats from './useRunningSessionStats';
import { msToHuman } from 'formatters/formatDateDiff';
import format from 'date-fns/format';
import EditIcon from '@material-ui/icons/Edit';
import StopIcon from '@material-ui/icons/Stop';
// import FastRewindIcon from '@material-ui/icons/FastRewind';
import { subMinutes } from 'date-fns';
import { Replay, Add, Remove } from '@material-ui/icons';
import { useStopRunningSession } from 'features/common/redux/useStopRunningSession';
import { useInterval } from '@common/hooks/useInterval';
import QuickPick from '../common/QuickPick';
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

const addMinutesToSession = (amount, edit, runningSession) => () =>
  edit({
    name: runningSession?.name,
    startDate: subMinutes(new Date(runningSession?.startDate || Date.now()), amount),
  });

export default function TimerTab() {
  const { runningSession, editRunningSession } = useEditRunningSession();
  const { stopRunningSession } = useStopRunningSession();
  const runningStats = useRunningSessionStats();
  // Tick every minute to update the UI
  const [count, setCount] = React.useState(0);
  useInterval(() => {
    setCount(count + 1);
  }, 60e3);

  const resetSession = () =>
    editRunningSession({ name: runningSession?.name, startDate: new Date() });
  const add5min = addMinutesToSession(5, editRunningSession, runningSession);
  const add30min = addMinutesToSession(5, editRunningSession, runningSession);
  const remove5min = addMinutesToSession(-5, editRunningSession, runningSession);
  const remove30min = addMinutesToSession(-30, editRunningSession, runningSession);

  if (!runningSession)
    return (
      <Page scroll>
        <QuickPick />
      </Page>
    );

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
      <Box display="flex" justifyContent="center" paddingBottom={2} paddingTop={1}>
        <StatRow title="Today" subtitle={msToHuman(runningStats.today)} />
        <StatRow title="Week" subtitle={msToHuman(runningStats.thisWeek)} />
        <StatRow title="Month" subtitle={msToHuman(runningStats.thisMonth)} />
      </Box>
      <Grid container spacing={1} alignContent="center" alignItems="center" justify="center">
        <ButtonActionText onClick={add5min} icon={<Add />} text='+5"' />
        <ButtonActionText onClick={add30min} icon={<Add />} text='+30"' />
        <ButtonActionText onClick={remove30min} icon={<Remove />} text='-30"' />
        <ButtonActionText onClick={remove5min} icon={<Remove />} text='-5"' />
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center" p={1}>
        <Box paddingRight={1}>
          <ButtonAction onClick={resetSession} icon={<Replay />} />
        </Box>
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

/**
 *
 *
 * @param {Object} props
 * @param {string}  props.title
 * @param {string}  props.subtitle
 */
function StatRow({ title, subtitle }) {
  return (
    <Box p={1}>
      <Card>
        <Box
          display="flex"
          p={1}
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Typography variant="subtitle2">{subtitle}</Typography>
          <Typography variant="body2">{title}</Typography>
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

/**
 * Renders a button with a label
 * @param {Object} props
 * @param {('primary'|'secondary')} [ props.color ]
 * @param {import('react').ReactNode} props.icon
 * @param {string} props.text
 * @param {import('react').ReactEventHandler} props.onClick
 **/
function ButtonActionText({ onClick, icon, text, color = 'primary' }) {
  return (
    <Box padding={1}>
      <Button
        variant="outlined"
        color={color}
        onClick={onClick}
        size="large"
        // startIcon={icon}
      >
        <Box>{text}</Box>
      </Button>
    </Box>
  );
}
