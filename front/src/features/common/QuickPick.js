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
import * as Icons from 'common/Icon/Icon';

const useStyle = makeStyles(theme => ({
  Button: {
    width: '100%',
  },
  Card: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderColor: ({ color }) => color || theme.palette.divider,
    position: 'relative',
    overflow: 'visible',
  },
  Icon: {
    position: 'absolute',
    top: '3px',
    left: '3px',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '50%',
    height: '30px',
    width: '30px',
    border: ({ color }) => `1px solid ${color || theme.palette.divider}`,
  },
}));

/**
 *
 *
 * @param {Object} props
 * @param {string} props.color
 * @param {string} props.iconName
 * @param {string} props.id
 * @param {import('react').ReactNode} props.children
 * @param {() => any} props.onClick
 */
function ButtonCard({ onClick, children, id, color, iconName }) {
  const style = useStyle({ color });
  const Icon = Icons[iconName] || Icons.Default;
  return (
    <Card variant="outlined" className={style.Card}>
      <div className={style.Icon}>
        <Icon color={color} />
      </div>
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
          {sessions.map(session => {
            const definition = definitions[session] || {};
            return (
              <Grid item xs={4} sm={3} key={session}>
                <ButtonCard
                  id={session}
                  onClick={startSession}
                  color={definition.color}
                  iconName={definition.icon}
                >
                  {session}
                </ButtonCard>
              </Grid>
            );
          })}
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
