import { CircularTimer } from './CircularTimer';
import React from 'react';
import Box from '@mui/material/Box';
import Page from '../common/Page';
import { useEditRunningSession } from 'features/common/redux/editRunningSession';
import { Button, Card, Typography } from '@mui/material';
import useRunningSessionStats from './useRunningSessionStats';
import { msToHuman } from 'formatters/formatDateDiff';
import StopIcon from '@mui/icons-material/Stop';
// import FastRewindIcon from '@mui/icons-material/FastRewind';
import { getISODay, subMinutes } from 'date-fns';
import { Replay, Add, Remove } from '@mui/icons-material';
import { useStopRunningSession } from 'features/common/redux/useStopRunningSession';
import { useInterval } from '@common/hooks/useInterval';

import useAppSelector from 'hooks/useSelector';
import { selectDefinition } from 'features/session-definition/selectDefinition';
import { Alert, AlertTitle } from '@mui/material';
import { RunningSession } from '@types';
import QuickPick from 'features/common/QuickPick';

type editFn = (args: { name: string; startDate: Date }) => any;

const addMinutesToSession = (amount: number, edit: editFn, runningSession: RunningSession) => () =>
  edit({
    name: runningSession?.name,
    startDate: subMinutes(new Date(runningSession?.startDate || Date.now()), amount),
  });

export default function TimerTab() {
  const { runningSession, editRunningSession } = useEditRunningSession();
  const { stopRunningSession } = useStopRunningSession();
  const runningStats = useRunningSessionStats();
  const sessionDefinition = useAppSelector((state) =>
    selectDefinition(state, runningSession?.name),
  );
  // Tick every minute to update the UI
  const [count, setCount] = React.useState(0);
  useInterval(() => {
    setCount(count + 1);
  }, 60e3);

  const resetSession = () =>
    editRunningSession({ name: runningSession?.name, startDate: new Date() });

  if (!runningSession)
    return (
      <Page scroll>
        <QuickPick />
      </Page>
    );

  if (!sessionDefinition) {
    return (
      <Alert severity="error">
        <AlertTitle>Session definition not found</AlertTitle>
        This is an impossible state, please reload your browser.
      </Alert>
    );
  }

  const add5min = addMinutesToSession(5, editRunningSession, runningSession);
  const add30min = addMinutesToSession(30, editRunningSession, runningSession);
  const remove5min = addMinutesToSession(-5, editRunningSession, runningSession);
  const remove30min = addMinutesToSession(-30, editRunningSession, runningSession);
  // Business days only
  const dayOfWeek = Math.min(getISODay(new Date()), 5);

  const dateStart = new Date(runningSession.startDate);
  const name = runningSession.name;
  return (
    <Page>
      <Card>
        <CircularTimer
          name={name}
          startDate={dateStart}
          color={sessionDefinition.color}
          expectedDuration={sessionDefinition.expectedDuration || 60}
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
          subtitle={msToHuman(runningStats.thisWeek / dayOfWeek || 0)}
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
function StatRow({ title, subtitle }: { title: string; subtitle: string }) {
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
 **/
function ButtonAction({
  onClick,
  icon,
  color = 'primary',
}: {
  color?: 'primary' | 'secondary';
  icon: React.ReactNode;
  onClick: React.ReactEventHandler;
}) {
  return (
    <Button
      variant="outlined"
      color={color}
      onClick={onClick}
      size="large"
      style={{ width: '62px' }}
    >
      <Box sx={{ fontSize: '2rem' }}>{icon}</Box>
    </Button>
  );
}

/**
 * Renders a button with a label
 **/
function ButtonActionText({
  onClick,
  text,
  color = 'primary',
}: {
  color?: 'primary' | 'secondary';
  icon: React.ReactNode;
  text: string;
  onClick: React.ReactEventHandler;
}) {
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
