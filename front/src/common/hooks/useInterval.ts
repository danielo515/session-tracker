import { useEffect, useRef } from 'react';

/**
 *
 *
 * @param {() => void} callback
 * @param {number | null} delay
 */
export function useInterval(callback: any, delay: any) {
  const savedCallback = useRef(callback);
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    if (delay === null) {
      return;
    }
    function tick() {
      savedCallback.current();
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
