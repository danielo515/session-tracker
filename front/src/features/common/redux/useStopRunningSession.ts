import selectRunningSession from 'features/home/redux/selectRunningSession';
import { stopSession } from 'features/home/redux/stopSession';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export function useStopRunningSession() {
  const dispatch = useDispatch();

  const { runningSession } = useSelector(
    state => ({
      runningSession: selectRunningSession(state),
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    return dispatch(stopSession());
  }, [dispatch]);

  return {
    runningSession,
    stopRunningSession: boundAction,
  };
}
