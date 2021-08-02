import { useSelector } from 'react-redux';
import selectRunningSessionStats from './redux/selectRunningSessionStats';
/**
 * @return {import('./redux/selectRunningSessionStats').Stats}
 */
function useTodaySessionStats() {
  const todaySessionStats = useSelector(selectRunningSessionStats);
  return todaySessionStats;
}

export default useTodaySessionStats;
