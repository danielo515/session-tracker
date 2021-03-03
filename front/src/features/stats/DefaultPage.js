import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {setupApp} from '../common/redux/actions';
import Dashboard from './Dashboard';

export class DefaultPage extends Component {
  static propTypes = {
    stats: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
    const {setupApp, getSessions} = this.props.actions
    setupApp().then(getSessions);
  }

  render() {
    const { sessions } = this.props.stats;
    return <Dashboard sessions={sessions}/>;
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    stats: state.stats,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, setupApp }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultPage);
