import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Login from './LoginComponent';
import SignUp from './SignUp';

type Props = {
    login: any;
    actions: any;
};

export class LoginDefaultPage extends Component<Props> {

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type 'Readon... Remove this comment to see the full error message
    const { actions, location, login } = this.props;
    const isLoginPage = location.pathname === '/login';
    return isLoginPage ? (
      <Login login={actions.loginAction} error={login.loginActionError} />
    ) : (
      <SignUp signUp={actions.signUp} error={login.signUpError} />
    );
  }
}

/**
 * @param {import('rootReducer').RootState} state
 */
function mapStateToProps(state: any) {
  return {
    login: state.login,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDefaultPage);
