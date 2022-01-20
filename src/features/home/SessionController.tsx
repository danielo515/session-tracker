import React from 'react';
import { styled } from '@mui/material/styles';
import { connect, ConnectedProps } from 'react-redux';
import Timer from './Timer';
import * as actions from './redux/actions';
import SessionStart from './SessionStart';
import SessionStop from './SessionStop';
import { RootState } from '@common/configStore';

const Root = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem 0',
});

export const SessionController = (props: ConnectedProps<typeof connector>) => {
  const { runningSession, startSession, stopSession } = props;
  return (
    <Root>
      <Timer startDate={runningSession?.startDate} isActive={Boolean(runningSession)} />
      {runningSession ? (
        <SessionStop
          stopSession={stopSession}
          name={runningSession.name}
          startDate={runningSession.startDate}
        />
      ) : (
        <SessionStart startSession={startSession} />
      )}
    </Root>
  );
};

function mapStateToProps(state: RootState) {
  return {
    runningSession: state.home.runningSession,
  };
}

const connector = connect(mapStateToProps, actions);

export default connector(SessionController);
