import PropTypes from 'prop-types';
import React from 'react';
import useTimeDiff from './hooks/useTimeDiff';
import { msToHourMinSec } from './msToHourMinSec';

/**
 * @param {string} hours
 * @param {string} minutes
 * @param {string} seconds
 */
const renderTimer = (hours, minutes, seconds) => (
  <div className="home-timer">
    <h3> {hours} </h3>:<h3> {minutes} </h3>
    <h3> : </h3>
    <h3> {seconds} </h3>
  </div>
);

/** @typedef {{ startDate: Date, isActive: true }} PropsA*/
/** @typedef {{ isActive: false }} PropsB*/
/**
 * @param {PropsA | PropsB} props
 */
export default function Timer(props) {
  if (!props.isActive) return renderTimer('00', '00', '00');
  const diff = useTimeDiff(props.startDate);
  const [hours, minutes, seconds] = msToHourMinSec(diff);
  return renderTimer(hours, minutes, seconds);
}

Timer.propTypes = {
  startDate: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};
Timer.defaultProps = {
  isActive: true,
};
