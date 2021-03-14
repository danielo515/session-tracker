import React, { useState } from 'react';
import BigButton from './BigButton';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import StopIcon from '@material-ui/icons/Stop';
import useHandleChange from './hooks/useHandleChange';
import Timer from './Timer';
import Zoom from '@material-ui/core/Zoom';

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
    <div>
      <form noValidate onSubmit={stop}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="session"
          label="Session Name"
          name="session-name"
          autoComplete="session"
          value={name}
          onChange={handleChange}
        />
      </form>
      <Zoom in={visible} unmountOnExit>
        <div>
          <BigButton onClick={stop} icon={StopIcon} variant="stop" />
        </div>
      </Zoom>
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
