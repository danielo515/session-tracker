import { calculateSessionDuration } from '@common/calculateSessionDuration';
import selectRunningSession from 'features/home/redux/selectRunningSession';
import { useSelector } from 'react-redux';
import selectSessionStatsByName from './redux/selectSessionStatsByName';
/**
 * @return {import('./redux/selectRunningSessionStats').Stats}
 */
function useRunningSessionStats() {
  const runningSession = useSelector(selectRunningSession);
  // We use this selector because we want to get the cached stats not including the running session, so we can manually calculate the latest duration in real time and keep the UI up to date.
  const sessionStats = useSelector(state => selectSessionStatsByName(state, runningSession?.name));
  if (!runningSession) return sessionStats;
  const runningSessionDuration = calculateSessionDuration(runningSession);
  const todaySessionStats = {
    today: sessionStats.today + runningSessionDuration,
    thisWeek: sessionStats.thisWeek + runningSessionDuration,
    thisMonth: sessionStats.thisMonth + runningSessionDuration,
  };
  return todaySessionStats;
}

export default useRunningSessionStats;
