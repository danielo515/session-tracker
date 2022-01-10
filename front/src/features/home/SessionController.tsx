import React from 'react';
import { connect } from 'react-redux';
import Timer from './Timer';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from './redux/actions';
import SessionStart from './SessionStart';
import SessionStop from './SessionStop';
import { RootState } from '@common/configStore';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem 0',
  },
}));

/**
 * @param {import('react-redux').ConnectedProps<typeof connector>} props
 */
export const SessionController = (
  props: import('react-redux').ConnectedProps<typeof connector>,
) => {
  const css = useStyles();
  const { runningSession, startSession, stopSession } = props;
  return (
    <div className={css.root}>
      <Timer startDate={runningSession?.startDate} isActive={Boolean(runningSession)} />
      {runningSession ? (
        <SessionStop
          stopSession={stopSession}
          name={runningSession.name}
          id={runningSession.id}
          startDate={runningSession.startDate}
        />
      ) : (
        <SessionStart startSession={startSession} />
      )}
    </div>
  );
};

function mapStateToProps(state: RootState) {
  return {
    runningSession: state.home.runningSession,
  };
}

const connector = connect(mapStateToProps, actions);

export default connector(SessionController);
