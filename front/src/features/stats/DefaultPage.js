import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSessions } from '../home/redux/actions';
import { setupApp } from '../common/redux/actions';
import Dashboard from './Dashboard';
import selectAllSessions from '../home/redux/selectAllSessions';

/**
 * @param {import('rootReducer').RootState} state
 */
function mapStateToProps(state) {
  return {
    stats: state.stats,
    sessions: selectAllSessions(state),
  };
}

const mapDispatchToProps = {
  setupApp,
  fetchSessions,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

/**
 * @param {import('react-redux').ConnectedProps<typeof connector>} Props
 */
function DefaultPage({ setupApp, fetchSessions, sessions }) {
  useEffect(() => {
    setupApp().then(fetchSessions);
  }, []);
  return <Dashboard sessions={sessions} />;
}

export default connector(DefaultPage);
