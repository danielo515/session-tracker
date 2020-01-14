import React from 'react';
import BigButton from './BigButton';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import useHandleChange from './hooks/useHandleChange'
import Timer from "./Timer";

export default function SessionStart({ startSession }) {
  const [sessionName, handleChange] = useHandleChange('')
  const start = () => startSession({ name: sessionName });
  return (
    <div>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Session Name"
          name="name"
          autoComplete="session"
          value={sessionName}
          onChange={handleChange}
          autoFocus
        />
      </form>
      <BigButton onClick={start} icon={PlayArrowIcon}/>
      <Timer isActive={false} ></Timer>
    </div>
  );
}

SessionStart.propTypes = {
  startSession: PropTypes.func.isRequired,
};
SessionStart.defaultProps = {};
