import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import useHandleChange from './hooks/useHandleChange';
import Timer from './Timer';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';

/** @typedef {Object} FormProps
 * @property {string} sessionName
 * @property {'primary'|'secondary'} color
 * @property {boolean} visible
 * @property {any} Icon
 * @property {React.ChangeEventHandler<HTMLInputElement>} onChange
 * @property {() => void} onSubmit
 */

/** @param {FormProps} props **/

export function SessionForm({ onSubmit, onChange, sessionName, visible, Icon, color }) {
  return (
    <form noValidate onSubmit={onSubmit}>
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
        onChange={onChange}
        className="input"
        size="small"
      />
      <div className="button">
        <Zoom in={visible}>
          <Button onClick={onSubmit} color={color} variant="outlined">
            <Icon />
          </Button>
        </Zoom>
      </div>
    </form>
  );
}

/** @typedef {Object} Props
 * @property {(args: {name: string}) => any} startSession
 */

/** @param {Props} props **/
export default function SessionStart({ startSession }) {
  const [sessionName, handleChange] = useHandleChange('');
  const [visible, setVisible] = useState(true);
  const start = () => {
    startSession({ name: sessionName });
    setVisible(false);
  };
  return (
    <div className="home-session-start">
      <SessionForm
        onSubmit={start}
        onChange={handleChange}
        sessionName={sessionName}
        visible={visible}
        Icon={PlayArrowIcon}
        color="primary"
      />
      <Timer isActive={false}></Timer>
    </div>
  );
}

SessionStart.propTypes = {
  startSession: PropTypes.func.isRequired,
};
SessionStart.defaultProps = {};
