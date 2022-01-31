import React from 'react';
import { bindActionCreators } from 'redux';
import Login from './LoginComponent';
import SignUp from './SignUp';
import { loginAction, loginArgs } from './redux/loginAction';
import { signUp } from './redux/actions';
import useAppSelector from 'hooks/useSelector';
import { useAppThunkDispatch } from '@common/configStore';
import { useMatch } from 'react-router-dom';
import { replace } from '@lagunovsky/redux-react-router';

const useLogin = () => {
  const dispatch = useAppThunkDispatch();
  const login = (args: loginArgs) =>
    dispatch(loginAction(args)).then(() => {
      dispatch(replace('/'));
    });

  return {
    loginAction: login,
    ...useAppSelector((state) => ({ login: state.login })),
    ...bindActionCreators(
      {
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
