import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Copyright } from '../common/Copyright';
import { setupApp } from '../common/redux/actions';
import * as actions from './redux/actions';
import SessionController from './SessionController';
import SessionsList from './SessionsList';

class SessionsPage extends Component {
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
        const { deleteSession, switchTask } = this.props.actions
        return (
        <div className="home-default-page">
            <SessionController />
            <SessionsList sessions={sessions} onDelete={deleteSession} onSwitch={switchTask} />
            <Box pt={4} className='home-copyright'>
                <Copyright />
            </Box>
        </div>);
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

export default connect(mapStateToProps, mapDispatchToProps)(SessionsPage);
