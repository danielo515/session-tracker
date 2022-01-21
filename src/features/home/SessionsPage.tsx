import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import SessionController from './SessionController';
import SessionsList from './SessionsList';
import EditSession from './EditSession';
import { FooterWithVersion } from '../common/index';
import selectGroupedSessions from './redux/selectGroupedSessions';
import { RootState } from '@common/configStore';
import Fab from '@mui/material/Fab';
import { Add } from '@mui/icons-material';
import { Slide, useTheme } from '@mui/material';
import selectRunningSession from './redux/selectRunningSession';
import { Link } from 'react-router-dom';

const SessionsPage = (props: import('react-redux').ConnectedProps<typeof connector>) => {
  useEffect(() => {
    const { fetchSessions } = props;
    fetchSessions();
  }, []);
  const { switchTask, editSession, groupedSessions, runningSession } = props;
  const theme = useTheme();
  return (
    <div className="home-default-page">
      <SessionsList
        sessions={groupedSessions}
        editSession={editSession}
        startSession={switchTask}
      />
      <EditSession />
      <SessionController />
      <Slide in={!runningSession}>
        <Fab
          color="secondary"
          component={Link}
          to="/session-definitions/new"
          aria-label="create-new-session"
          sx={{ right: theme.spacing(2), bottom: theme.spacing(2), position: 'absolute' }}
        >
          <Add />
        </Fab>
      </Slide>
      <Box pt={3} pb={1} className="home-copyright">
        <FooterWithVersion />
      </Box>
    </div>
  );
};

function mapStateToProps(state: RootState) {
  return {
    groupedSessions: selectGroupedSessions(state),
    runningSession: selectRunningSession(state),
  };
}

/* istanbul ignore next */
const mapDispatchToProps = {
  ...actions,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(SessionsPage);
