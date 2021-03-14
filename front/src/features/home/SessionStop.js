import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import StopIcon from '@material-ui/icons/Stop';
import Button from '@material-ui/core/Button';
import useHandleChange from './hooks/useHandleChange';
import Timer from './Timer';
import Zoom from '@material-ui/core/Zoom';
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
    <div className="home-session-start">
      <SessionForm
        onSubmit={stop}
        onChange={handleChange}
        sessionName={sessionName}
        visible={visible}
        Icon={StopIcon}
        color="secondary"
      />
      <Timer startDate={startDate}></Timer>
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
