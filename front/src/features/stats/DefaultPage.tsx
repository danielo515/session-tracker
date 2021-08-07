import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSessions } from '../home/redux/actions';
import Dashboard from './Dashboard';

const mapDispatchToProps = {
  fetchSessions,
};

const connector = connect(null, mapDispatchToProps);

/**
 * @param {import('react-redux').ConnectedProps<typeof connector>} Props
 */
function StatsDefaultPage({
  fetchSessions
}: any) {
  useEffect(() => {
    fetchSessions();
  }, []);
  return <Dashboard />;
}

export default connector(StatsDefaultPage);
