import React, { Component, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { setupApp } from '../common/redux/actions';
import { Redirect } from 'react-router-dom';
import { RootState } from 'rootReducer';
import useAppSelector from 'hooks/useSelector';

type Props = {
  isSetupPending: boolean;
  isLoggedIn: boolean;
  setupApp: () => void;
  children: React.ReactNode;
  location: {
    pathname: string;
  };
};
/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
const App = (props: Props) => {
  const { isSetupPending, isLoggedIn } = useAppSelector(state => ({
    isSetupPending: state.common.setupAppPending,
    isLoggedIn: state.common.loggedIn,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setupApp());
  }, []);
  const { children, location } = props;
  const alreadyAtLoginPage = location.pathname === '/login';
  return (
    <React.Fragment>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="page-container">
          {isSetupPending ? null : !isLoggedIn && !alreadyAtLoginPage ? (
            <Redirect to="login" />
          ) : (
            children
          )}
        </div>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
};

export default App;
