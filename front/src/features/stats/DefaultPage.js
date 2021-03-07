import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { setupApp } from '../common/redux/actions';
import Dashboard from './Dashboard';

/**
 * @param {import('../../common/rootReducer').RootState} state
 */
function mapStateToProps(state) {
  return {
    stats: state.stats,
  };
}

const mapDispatchToProps = {
  ...actions,
  setupApp,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

/**
 * @param {import('react-redux').ConnectedProps<typeof connector>} Props
 */
function DefaultPage({ setupApp, getSessions, stats }) {
  useEffect(() => {
    setupApp().then(getSessions);
  }, []);
  const { sessions } = stats;
  return <Dashboard sessions={sessions} />;
}

export default connector(DefaultPage);
