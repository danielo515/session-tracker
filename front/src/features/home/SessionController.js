import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import SessionStart from './SessionStart';
import SessionStop from './SessionStop';

export class SessionController extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleChange = event => this.props.actions.setSessionName(event.target.value);

  render() {
    const { runningSession } = this.props.home;
    const { startSession, stopSession } = this.props.actions;
    return runningSession ? (
      <SessionStop
        stopSession={stopSession}
        name={runningSession.name}
        id={runningSession.id}
        startDate={runningSession.startDate}
      />
    ) : (
      <SessionStart startSession={startSession} />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SessionController);
