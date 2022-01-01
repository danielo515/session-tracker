import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { setupApp } from '../common/redux/actions';
import { Redirect } from 'react-router-dom';
import { RootState } from 'rootReducer';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
class App extends Component<{
  isSetupPending: boolean;
  isLoggedIn: boolean;
  setupApp: () => void;
  location: { pathname: string };
}> {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  componentDidMount() {
    this.props.setupApp();
  }

  render() {
    const { isSetupPending, isLoggedIn, location } = this.props;
    const alreadyAtLoginPage = location.pathname === '/login';
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="page-container">
            {isSetupPending ? null : !isLoggedIn && !alreadyAtLoginPage ? (
              <Redirect to="login" />
            ) : (
              this.props.children
            )}
          </div>
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    isSetupPending: state.common.setupAppPending,
    isLoggedIn: state.common.loggedIn,
  };
}

/* istanbul ignore next */
const mapDispatchToProps = {
  setupApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
