import { calculateSessionDuration } from '@common/calculateSessionDuration';
import selectRunningSession from 'features/home/redux/selectRunningSession';
import useAppSelector from 'hooks/useSelector';
import selectSessionStatsByName from './redux/selectSessionStatsByName';
import { Stats } from './redux/selectRunningSessionStats';

function useRunningSessionStats(): Stats {
  const runningSession = useAppSelector(selectRunningSession);
  // We use this selector because we want to get the cached stats not including the running session, so we can manually calculate the latest duration in real time and keep the UI up to date.
  const sessionStats = useAppSelector(state =>
    selectSessionStatsByName(state, runningSession?.name),
  );
  if (!runningSession) return sessionStats;
  const runningSessionDuration = calculateSessionDuration(runningSession);
  const todaySessionStats = {
    today: sessionStats.today + runningSessionDuration,
    todayCount: sessionStats.todayCount + 1,
    thisWeek: sessionStats.thisWeek + runningSessionDuration,
    thisMonth: sessionStats.thisMonth + runningSessionDuration,
    allTime: sessionStats.allTime + runningSessionDuration,
    count: sessionStats.count + 1,
  };
  return todaySessionStats;
}

export default useRunningSessionStats;
