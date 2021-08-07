import { useEffect, useState } from 'react';

// This is not meant to be used for several timers at once, it will not perform very well.
// For multiple timers it is better to use a tick function to force a reload of all the timers at once
// and do the calculation on each timer render function

/**
 * @param {string | Date | number} startDate
 */
const useTimeDiff = (startDate: any) => {
  const originalDate = new Date(startDate);
  const [diff, setDiff] = useState(Date.now() - originalDate.getTime());
  useEffect(() => {
    const timer = setInterval(() => setDiff(Date.now() - originalDate.getTime()), 1000);
    return () => clearInterval(timer);
  }, []);
  return diff;
};

export default useTimeDiff;
