import React, { Component } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { setupApp } from '../common/redux/actions';
import { Redirect } from 'react-router-dom';

type OwnProps = {};

type Props = OwnProps & typeof App.defaultProps;

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
class App extends Component<Props> {

  static defaultProps = {
    children: '',
  };

  componentDidMount() {
    (this.props as any).setupApp();
  }

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSetupPending' does not exist on type '... Remove this comment to see the full error message
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
/* istanbul ignore next */
/**
 * @param {import('rootReducer').RootState} state
 */
function mapStateToProps(state: any) {
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
