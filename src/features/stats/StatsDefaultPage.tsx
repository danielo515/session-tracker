import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchSessions } from '../home/redux/actions';
import Dashboard from './Dashboard';

const mapDispatchToProps = {
  fetchSessions,
};

const connector = connect(null, mapDispatchToProps);

function StatsDefaultPage({ fetchSessions }: ConnectedProps<typeof connector>) {
  useEffect(() => {
    fetchSessions();
  }, []);
  return <Dashboard />;
}

export default connector(StatsDefaultPage);
