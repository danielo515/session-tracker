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

const useStyle = makeStyles({
  Button: {
    width: '100%',
  },
  Card: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

function ButtonCard({ onClick, children, id }) {
  const style = useStyle();
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

  render() {
    const { sessions, actions } = this.props;
    const startSession = e => {
      const name = e.currentTarget.dataset.session;
      actions.startSession({ name });
    };
    return (
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          {sessions.map(session => (
            <Grid item xs={4} sm={3} key={session}>
              <ButtonCard id={session} onClick={startSession}>
                {session}
              </ButtonCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    sessions: selectSessionNames(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ startSession }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickPick);
