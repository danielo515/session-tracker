import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Login from './LoginComponent';
import SignUp from './SignUp';

export class DefaultPage extends Component {
  static propTypes = {
    login: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
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
function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
