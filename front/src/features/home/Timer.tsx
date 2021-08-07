
import { motion, AnimatePresence } from 'framer-motion';

import React from 'react';
import useTimeDiff from './hooks/useTimeDiff';
import { msToHourMinSec } from './msToHourMinSec';

/**
 * @param {{startDate: string}} props
 */
export const RenderTimer = ({
  startDate
}: any) => {
  useTimeDiff(startDate);
  const [hours, minutes, seconds] = msToHourMinSec(Date.now() - new Date(startDate).getTime());
  return (
    <div className="home-timer">
      <h3> {hours} </h3>:<h3> {minutes} </h3>
      <h3> : </h3>
      <h3> {seconds} </h3>
    </div>
  );
};

const initial = { maxWidth: 0, opacity: 0 };
const exit = { maxWidth: 0, opacity: 0 };
const animateTo = { maxWidth: 200, opacity: 1 };
const style = { overflow: 'hidden' };

type OwnTimerProps = {
    startDate?: string;
    isActive?: boolean;
};

// @ts-expect-error ts-migrate(2565) FIXME: Property 'defaultProps' is used before being assig... Remove this comment to see the full error message
type TimerProps = OwnTimerProps & typeof Timer.defaultProps;

/** @typedef {{ isActive: boolean, startDate?: string }} PropsB*/
/**
 * @param {PropsB} props
 */
export default function Timer({ startDate }: TimerProps) {
  return (
    <div className={`home-timer-wrapper ${!startDate ? 'empty' : ''}`}>
      <AnimatePresence exitBeforeEnter>
        {startDate && (
          <motion.div
            initial={initial}
            animate={animateTo}
            exit={exit}
            key={startDate}
            style={style}
            transition={{ duration: 1 }}
          >
            <RenderTimer startDate={startDate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
Timer.defaultProps = {
  isActive: true,
};
