import PropTypes from 'prop-types';
import React from 'react';
import useTimeDiff from './hooks/useTimeDiff'
const second = 1000;
const minute = 60 * second;

const msToMinSec = ms => {
  const minutes = ms / minute | 0; // 32 bit integer shorthand
  const seconds = (ms % minute) / second | 0;
  return [
    `${minutes}`.padStart(2, '0'),
    `${seconds}`.padStart(2, '0')
  ]
}

const renderTimer = (minutes, seconds) => (
  <div className="home-timer">
    <h3> {minutes} </h3><h3> : </h3><h3> {seconds} </h3>
  </div>
)

export default function Timer({ startDate, isActive }) {
  if (!isActive) return renderTimer('00','00');
  const diff = useTimeDiff(startDate);
  const [minutes, seconds] = msToMinSec(diff);
  return renderTimer(minutes, seconds)
};

Timer.propTypes = {
  startDate: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};
Timer.defaultProps = {
  isActive: true
};
