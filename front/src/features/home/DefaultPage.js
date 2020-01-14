import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Copyright } from '../common/Copyright';
import Navigation from '../common/Navigation'
import { setupApp } from '../common/redux/actions';
import * as actions from './redux/actions';
import SessionController from './SessionController';
import SessionsList from './SessionsList';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { setupApp, fetchSessions } = this.props.actions;
    setupApp().then(fetchSessions);
  }

  render() {
    const { sessions } = this.props.home
    const { deleteSession } = this.props.actions
    return (
      <React.Fragment>
        <Navigation page='timer' />
        <div className="home-default-page">
          <SessionController />
          <div>
            <Link to='stats' variant="body2" component={RouterLink}>
              See Stats
            </Link>
            <SessionsList sessions={sessions} onDelete={deleteSession}/>
          </div>
          <Box pt={4}>
            <Copyright />
          </Box>
        </div>
      </React.Fragment>
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
    actions: bindActionCreators({ ...actions, setupApp }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
