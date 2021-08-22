import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import selectSessionNames from './redux/selectSessionNames';
import { startSession } from '../home/redux/actions';
import {
  Card,
  Grid,
  Typography,
  CardContent,
  ButtonBase,
  makeStyles,
  Container,
} from '@material-ui/core';
import { fetchAllDefinitions } from 'features/session-definition/redux/actions';

const useStyle = makeStyles({
  Button: {
    width: '100%',
  },
  Card: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderColor: ({ color }) => color,
  },
});

function ButtonCard({ onClick, children, id, color }) {
  const style = useStyle({ color });
  return (
    <Card variant="outlined" className={style.Card}>
      <ButtonBase className={style.Button} onClick={onClick} data-session={id}>
        <CardContent>
          <Typography>{children}</Typography>
        </CardContent>
      </ButtonBase>
    </Card>
  );
}

export class QuickPick extends Component {
  static propTypes = {
    sessions: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchAllDefinitions();
  }

  render() {
    const { sessions, actions, sessionDefinitions: definitions } = this.props;
    const startSession = e => {
      const name = e.currentTarget.dataset.session;
      actions.startSession({ name });
    };
    return (
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          {sessions.map(session => (
            <Grid item xs={4} sm={3} key={session}>
              <ButtonCard id={session} onClick={startSession} color={definitions[session]?.color}>
                {session}
              </ButtonCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

/**
 * @param {import('rootReducer').RootState} state
 */
function mapStateToProps(state) {
  return {
    sessions: selectSessionNames(state),
    sessionDefinitions: state.sessionDefinition.byName,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ startSession, fetchAllDefinitions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickPick);
