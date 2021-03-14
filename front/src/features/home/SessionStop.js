import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StopIcon from '@material-ui/icons/Stop';
import useHandleChange from './hooks/useHandleChange';
import Timer from './Timer';
import { SessionForm } from './SessionStart';

/** @typedef {Object} Props
 * @property {string} name
 * @property {string} id
 * @property {string} startDate
 * @property {Function} stopSession
 */
/**
 * @export
 * @param {Props} Props
 */
export default function SessionStop({ name: sessionName, id, stopSession, startDate }) {
  const [name, handleChange] = useHandleChange(sessionName);
  const [visible, setVisible] = useState(true);
  const stop = () => {
    stopSession({ id, name });
    setVisible(false);
  };
  return (
    <div className="home-session-stop">
      <Timer startDate={startDate}></Timer>
      <SessionForm
        onSubmit={stop}
        onChange={handleChange}
        sessionName={sessionName}
        visible={visible}
        Icon={StopIcon}
        color="secondary"
      />
    </div>
  );
}

SessionStop.propTypes = {
  stopSession: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  startDate: PropTypes.string.isRequired,
};
SessionStop.defaultProps = {};
