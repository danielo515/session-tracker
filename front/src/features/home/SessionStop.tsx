import React, { useState } from 'react';
import StopIcon from '@material-ui/icons/Stop';
import useHandleChange from './hooks/useHandleChange';
import { SessionForm } from './SessionStart';

type OwnProps = {
    stopSession: (...args: any[]) => any;
    name?: string;
    startDate: string;
};

// @ts-expect-error ts-migrate(2565) FIXME: Property 'defaultProps' is used before being assig... Remove this comment to see the full error message
type Props = OwnProps & typeof SessionStop.defaultProps;

/** @typedef {Object} Props
 * @property {string} name
 * @property {string} startDate
 * @property {Function} stopSession
 */
/**
 * @export
 * @param {Props} Props
 */
export default function SessionStop({ name: sessionName, stopSession, startDate }: Props) {
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
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
SessionStop.defaultProps = {};
