import Box from '@material-ui/core/Box';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setupApp } from '../common/redux/actions';
import * as actions from './redux/actions';
import SessionController from './SessionController';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';
import SessionsList from './SessionsList';
import loadable from 'react-loadable';
import { FooterWithVersion } from '../common/index';
import selectGroupedSessions from './redux/selectGroupedSessions';
import { TaskGroup } from './TaskGroup';
import List from '@material-ui/core/List';

const LoadingComponent = () => <h3>please wait...</h3>;
const EditSessionPromise = () => {
  return import('./EditSession');
};
const EditSession = loadable({
  loader: EditSessionPromise,
  loading: LoadingComponent,
});

/**
 * @param {import('react-redux').ConnectedProps<typeof connector>} props
 */
const SessionsPage = props => {
  useEffect(() => {
    const { setupApp, fetchSessions } = props;
    setupApp().then(fetchSessions);
  }, []);
  const { sessions, editing, sessionBeingEdited } = props.home;
  const {
    deleteSession,
    switchTask,
    editSession,
    cancelEditSession,
    updateSession,
    groupedSessions,
  } = props;
  const sessionToEdit = editing ? sessions.find(s => s.id === sessionBeingEdited) : {};
  return (
    <div className="home-default-page">
      <SessionController />
      {/* <SessionsList
        icon={PlayIcon}
        sessions={sessions}
        primaryAction={editSession}
        secondaryAction={switchTask}
      /> */}
      <List>
        {groupedSessions.map(x => (
          <TaskGroup key={x.name} {...x} />
        ))}
      </List>
      <EditSession
        key={editing}
        open={editing}
        cancel={cancelEditSession}
        onDelete={deleteSession}
        onSubmit={updateSession}
        {...sessionToEdit}
      />
      <Box pt={4} className="home-copyright">
        <FooterWithVersion />
      </Box>
    </div>
  );
};

/* istanbul ignore next */
/**
 * @param {import('rootReducer').RootState} state
 */
function mapStateToProps(state) {
  return {
    home: state.home,
    groupedSessions: selectGroupedSessions(state),
  };
}

/* istanbul ignore next */
const mapDispatchToProps = {
  ...actions,
  setupApp,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(SessionsPage);
