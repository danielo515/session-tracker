import React from 'react';
import { bindActionCreators } from 'redux';
import Login from './LoginComponent';
import SignUp from './SignUp';
import { loginAction } from './redux/loginAction';
import { signUp } from './redux/actions';
import useAppSelector from 'hooks/useSelector';
import { useAppDispatch } from '@common/configStore';
import { useMatch } from 'react-router-dom';

const useLogin = () => {
  const dispatch = useAppDispatch();

  return {
    ...useAppSelector((state) => ({ login: state.login })),
    ...bindActionCreators(
      {
        loginAction: loginAction,
        signUp: signUp,
      },
      dispatch,
    ),
  };
};

export const LoginDefaultPage = () => {
  const { loginAction, signUp, login } = useLogin();
  const isLoginPage = useMatch('/login');
  return isLoginPage ? (
    <Login login={loginAction} error={login.loginActionError} />
  ) : (
    <SignUp signUp={signUp} error={login.signUpError} />
  );
};
export default LoginDefaultPage;