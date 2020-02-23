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
import EditSession from './EditSession';

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
        const { sessions, editing, sessionBeingEdited } = this.props.home
        const { deleteSession, switchTask, editSession, updateSession } = this.props.actions
        const sessionToEdit = editing ? sessions.find(s => s.id === sessionBeingEdited) : {};
        return (
            <div className="home-default-page">
                <SessionController />
                <SessionsList sessions={sessions} primaryAction={editSession} onSwitch={switchTask} />
                <EditSession key={editing} open={editing} onDelete={deleteSession} onSubmit={updateSession} {...sessionToEdit} />
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
