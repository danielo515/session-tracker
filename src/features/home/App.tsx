import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { setupApp } from '../common/redux/actions';
import { Outlet, useMatch } from 'react-router-dom';
import useAppSelector from 'hooks/useSelector';
import { push } from '@lagunovsky/redux-react-router';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme();

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
*/
const App = () => {
  const { isSetupPending, isLoggedIn } = useAppSelector((state) => ({
    isSetupPending: state.common.setupAppPending,
    isLoggedIn: state.common.loggedIn,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setupApp());
  }, []);
  const alreadyAtLoginPage = useMatch('/login');

  useEffect(() => {
    if (!isSetupPending && !alreadyAtLoginPage && !isLoggedIn) {
      dispatch(push('/login'));
    }
  }, [isSetupPending, alreadyAtLoginPage, isLoggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="page-container">{isSetupPending ? null : <Outlet />}</div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
