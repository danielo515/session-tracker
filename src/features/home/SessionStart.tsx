import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import useHandleChange from './hooks/useHandleChange';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';

type FormProps = {
  sessionName: string;
  color: 'primary' | 'secondary';
  visible: boolean;
  Icon: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void;
};

export function SessionForm({ onSubmit, onChange, sessionName, visible, Icon, color }: FormProps) {
  return (
    <form noValidate onSubmit={onSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="session"
        name="session-name"
        autoComplete="session"
        label="Session Name"
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

type Props = {
  startSession: (args: { name: string }) => any;
};
export default function SessionStart({ startSession }: Props) {
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
    </div>
  );
}

SessionStart.propTypes = {
  startSession: PropTypes.func.isRequired,
};
SessionStart.defaultProps = {};
