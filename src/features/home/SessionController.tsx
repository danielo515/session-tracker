import React from 'react';
import { styled } from '@mui/material/styles';
import { connect, ConnectedProps } from 'react-redux';
import Timer from './Timer';
import * as actions from './redux/actions';
import { RootState } from '@common/configStore';
import { AppBar, Button, Container, Slide, Typography } from '@mui/material';
import Stop from '@mui/icons-material/Stop';

const Root = styled('div')({
  position: 'fixed',
  bottom: 0,
  right: 0,
  left: 0,
  top: 'auto',
});

const Content = styled(Container)(({ theme: { palette, spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '0 auto',
  color: palette.primary.contrastText,
  padding: spacing(2),
}));

export const SessionController = (props: ConnectedProps<typeof connector>) => {
  const { runningSession, stopSession } = props;
  return (
    <Root>
      <Slide in={!!runningSession} direction="up">
        <AppBar position="relative" sx={{ top: 'auto', bottom: 0 }}>
          <Content>
            <Timer
              startDate={runningSession?.startDate || new Date()}
              isActive={Boolean(runningSession)}
            />
            {runningSession ? (
              <>
                <Typography variant="body1">{runningSession.name}</Typography>
                <Button onClick={stopSession} color="secondary" variant="outlined">
                  <Stop />
                </Button>
              </>
            ) : (
              <Typography variant="body1"> </Typography>
            )}
          </Content>
        </AppBar>
      </Slide>
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
