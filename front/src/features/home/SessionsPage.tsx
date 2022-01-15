import Box from '@material-ui/core/Box';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import SessionController from './SessionController';
import SessionsList from './SessionsList';
import EditSession from './EditSession';
import { FooterWithVersion } from '../common/index';
import selectGroupedSessions from './redux/selectGroupedSessions';
import { RootState } from '@common/configStore';

const SessionsPage = (props: import('react-redux').ConnectedProps<typeof connector>) => {
  useEffect(() => {
    const { fetchSessions } = props;
    fetchSessions();
  }, []);
  const { switchTask, editSession, groupedSessions } = props;
  return (
    <div className="home-default-page">
      <SessionController />
      <SessionsList
        sessions={groupedSessions}
        editSession={editSession}
        startSession={switchTask}
      />
      <EditSession />
      <Box pt={4} className="home-copyright">
        <FooterWithVersion />
      </Box>
    </div>
  );
};

function mapStateToProps(state: RootState) {
  return {
    groupedSessions: selectGroupedSessions(state),
  };
}

/* istanbul ignore next */
const mapDispatchToProps = {
  ...actions,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(SessionsPage);
