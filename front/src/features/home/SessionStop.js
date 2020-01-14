import React, { useEffect } from 'react';
import BigButton from './BigButton';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import StopIcon from '@material-ui/icons/Stop';
import useHandleChange from './hooks/useHandleChange'
import Timer from "./Timer";
export default function SessionStop({ name: sessionName, id, stopSession, startDate }) {
  const [name, handleChange] = useHandleChange(sessionName)
  const stop = () => stopSession({ id, name });
  return (
    <div>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          label="Session Name"
          name="name"
          autoComplete="session"
          value={name}
          onChange={handleChange}
        />
      </form>
      <BigButton onClick={stop} icon={StopIcon} variant='stop'/>
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
