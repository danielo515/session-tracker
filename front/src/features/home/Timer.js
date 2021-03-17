import PropTypes from 'prop-types';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

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

/** @typedef {{ isActive: true , startDate: string}} PropsA*/
/** @typedef {{ isActive: false, startDate?: string }} PropsB*/
/**
 * @param {PropsA | PropsB} props
 */
export default function Timer({ isActive, startDate }) {
  return (
    <div className="home-timer-wrapper">
      <SwitchTransition mode="out-in">
        <CSSTransition
          // in={isActive}
          appear
          key={startDate || String(isActive)}
          unmountOnExit
          mountOnEnter
          classNames="timer"
          timeout={5000}
        >
          {startDate ? <RenderTimer startDate={startDate} /> : <span />}
        </CSSTransition>
      </SwitchTransition>
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
