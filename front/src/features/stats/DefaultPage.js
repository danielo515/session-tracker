import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSessions } from '../home/redux/actions';
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
  fetchSessions,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

/**
 * @param {import('react-redux').ConnectedProps<typeof connector>} Props
 */
function DefaultPage({ fetchSessions, sessions }) {
  useEffect(() => {
    fetchSessions();
  }, []);
  return <Dashboard sessions={sessions} />;
}

export default connector(DefaultPage);
