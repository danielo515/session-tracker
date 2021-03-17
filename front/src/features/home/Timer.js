import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import React from 'react';
import useTimeDiff from './hooks/useTimeDiff';
import { msToHourMinSec } from './msToHourMinSec';

/**
 * @param {{startDate: string}} props
 */
const RenderTimer = ({ startDate }) => {
  const diff = useTimeDiff(startDate);
  const [hours, minutes, seconds] = msToHourMinSec(diff);
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

/** @typedef {{ isActive: boolean, startDate?: string }} PropsB*/
/**
 * @param {PropsB} props
 */
export default function Timer({ startDate }) {
  return (
    <div className="home-timer-wrapper">
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

Timer.propTypes = {
  startDate: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};
Timer.defaultProps = {
  isActive: true,
};
