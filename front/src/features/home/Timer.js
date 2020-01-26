import PropTypes from 'prop-types';
import React from 'react';
import useTimeDiff from './hooks/useTimeDiff'
const second = 1000;
const minute = 60 * second;
const hour = minute * 60;

const msToMinSec = ms => {
  const hours = ms / hour | 0;
  const minutes = (ms % hour) / minute | 0; // 32 bit integer shorthand
  const seconds = (ms % minute) / second | 0;
  return [
    `${hours}`.padStart(2, '0'),
    `${minutes}`.padStart(2, '0'),
    `${seconds}`.padStart(2, '0')
  ]
}

const renderTimer = (hours, minutes, seconds) => (
  <div className="home-timer">
    <h3> {hours} </h3>:<h3> {minutes} </h3><h3> : </h3><h3> {seconds} </h3>
  </div>
)

export default function Timer({ startDate, isActive }) {
  if (!isActive) return renderTimer('00', '00', '00');
  const diff = useTimeDiff(startDate);
  const [hours, minutes, seconds] = msToMinSec(diff);
  return renderTimer(hours,minutes, seconds)
};

Timer.propTypes = {
  startDate: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};
Timer.defaultProps = {
  isActive: true
};
