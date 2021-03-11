import React, { useState } from 'react';
import BigButton from './BigButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import useHandleChange from './hooks/useHandleChange';
import Timer from './Timer';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
/** @typedef {Object} Props
 * @property {(args: {name: string}) => any} startSession
 */

/** @param {Props} props **/
export default function SessionStart({ startSession }) {
  const [sessionName, handleChange] = useHandleChange('');
  const [visible, setVisible] = useState(true);
  const css = useStyles();
  const start = () => {
    startSession({ name: sessionName });
    setVisible(false);
  };
  return (
    <div className={css.root}>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="session"
          label="Session Name"
          name="session-name"
          autoComplete="session"
          value={sessionName}
          onChange={handleChange}
        />
      </form>
      <Zoom in={visible}>
        <div>
          <BigButton onClick={start} icon={PlayArrowIcon} />
        </div>
      </Zoom>
      <Timer isActive={false}></Timer>
    </div>
  );
}

SessionStart.propTypes = {
  startSession: PropTypes.func.isRequired,
};
SessionStart.defaultProps = {};
