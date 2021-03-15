import React from 'react';
import { connect } from 'react-redux';
import { TransitionGroup } from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from './redux/actions';
import SessionStart from './SessionStart';
import SessionStop from './SessionStop';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

/**
 * @param {import('react-redux').ConnectedProps<typeof connector>} props
 */
export const SessionController = props => {
  const css = useStyles();
  const { runningSession } = props.home;
  const { startSession, stopSession } = props;
  return (
    <TransitionGroup className={css.root}>
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
    </TransitionGroup>
  );
};

/* istanbul ignore next */
/**
 * @param {import('rootReducer').RootState} state
 */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

const connector = connect(mapStateToProps, actions);

export default connector(SessionController);
