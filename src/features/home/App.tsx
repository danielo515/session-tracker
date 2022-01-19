import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { setupApp } from '../common/redux/actions';
import { Outlet, useMatch } from 'react-router-dom';
import useAppSelector from 'hooks/useSelector';
import { push } from '@lagunovsky/redux-react-router';
import { ThemeProvider, Theme, StyledEngineProvider, createTheme } from '@mui/material/styles';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const theme = createTheme();

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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="page-container">{isSetupPending ? null : <Outlet />}</div>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
