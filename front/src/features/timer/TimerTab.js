import { CircularTimer } from './CircularTimer';
import React from 'react';
import Box from '@material-ui/core/Box';
import Page from '../common/Page';
import { useEditRunningSession } from 'features/common/redux/editRunningSession';
import { Button, Card, Typography } from '@material-ui/core';
import useRunningSessionStats from './useRunningSessionStats';
import { msToHuman } from 'formatters/formatDateDiff';
import StopIcon from '@material-ui/icons/Stop';
// import FastRewindIcon from '@material-ui/icons/FastRewind';
import { subMinutes } from 'date-fns';
import { Replay, Add, Remove } from '@material-ui/icons';
import { useStopRunningSession } from 'features/common/redux/useStopRunningSession';
import { useInterval } from '@common/hooks/useInterval';

import QuickPick from '../common/QuickPick';
import useAppSelector from 'hooks/useSelector';
import selectDefinition from 'features/session-definition/selectDefinition';

const addMinutesToSession = (amount, edit, runningSession) => () =>
  edit({
    name: runningSession?.name,
    startDate: subMinutes(new Date(runningSession?.startDate || Date.now()), amount),
  });

export default function TimerTab() {
  const { runningSession, editRunningSession } = useEditRunningSession();
  const { stopRunningSession } = useStopRunningSession();
  const runningStats = useRunningSessionStats();
  const sessionDefinition = useAppSelector(state =>
    selectDefinition(state, { name: runningSession?.name }),
  );
  // Tick every minute to update the UI
  const [count, setCount] = React.useState(0);
  useInterval(() => {
    setCount(count + 1);
  }, 60e3);

  const resetSession = () =>
    editRunningSession({ name: runningSession?.name, startDate: new Date() });
  const add5min = addMinutesToSession(5, editRunningSession, runningSession);
  const add30min = addMinutesToSession(30, editRunningSession, runningSession);
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
      <Card>
        <CircularTimer
          name={name}
          startDate={dateStart}
          color={sessionDefinition?.color}
          expectedDuration={sessionDefinition?.expectedDuration || 60}
        />
      </Card>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
      ></Box>
      <Box display="flex" justifyContent="center" paddingBottom={2} paddingTop={1}>
        <StatRow
          title="Week Avg."
          // For now, week average is fixed to business days
          subtitle={msToHuman(runningStats.thisWeek / 5 || 0)}
        />
        <StatRow title="Today" subtitle={msToHuman(runningStats.today)} />
        <StatRow title="Week" subtitle={msToHuman(runningStats.thisWeek)} />
        <StatRow title="Month" subtitle={msToHuman(runningStats.thisMonth)} />
      </Box>
      <Card>
        <Box display="flex" alignItems="center" justifyContent="center" p={1}>
          <ButtonActionText onClick={add5min} icon={<Add />} text='+5"' />
          <ButtonActionText onClick={add30min} icon={<Add />} text='+30"' />
          <ButtonActionText onClick={remove30min} icon={<Remove />} text='-30"' />
          <ButtonActionText onClick={remove5min} icon={<Remove />} text='-5"' />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={1}>
          <Box padding={1}>
            <ButtonAction onClick={resetSession} icon={<Replay />} />
          </Box>
          <Box padding={1}>
            <ButtonAction icon={<StopIcon />} color="secondary" onClick={stopRunningSession} />
          </Box>
        </Box>
      </Card>
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
    <Button
      variant="outlined"
      color={color}
      onClick={onClick}
      size="large"
      style={{ width: '62px' }}
    >
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
        style={{ width: '62px' }}
        // startIcon={icon}
      >
        <Box>{text}</Box>
      </Button>
    </Box>
  );
}
