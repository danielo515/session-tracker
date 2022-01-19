import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StopIcon from '@mui/icons-material/Stop';
import useHandleChange from './hooks/useHandleChange';
import { SessionForm } from './SessionStart';

type Props = {
  name: string;
  startDate?: string;
  stopSession: ({ name }: { name: string }) => void;
};
export default function SessionStop({ name: sessionName, stopSession }: Props) {
  const [name, handleChange] = useHandleChange(sessionName);
  const [visible, setVisible] = useState(true);
  const stop = () => {
    stopSession({ name });
    setVisible(false);
  };
  return (
    <div className="home-session-stop">
      <SessionForm
        onSubmit={stop}
        onChange={handleChange}
        sessionName={name}
        visible={visible}
        Icon={StopIcon}
        color="secondary"
      />
    </div>
  );
}

SessionStop.propTypes = {
  stopSession: PropTypes.func.isRequired,
  name: PropTypes.string,
  startDate: PropTypes.string.isRequired,
};
SessionStop.defaultProps = {};
