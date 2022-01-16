import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { setupApp } from '../common/redux/actions';
import { Navigate, Outlet, Route, useMatch } from 'react-router-dom';
import useAppSelector from 'hooks/useSelector';

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
  return (
    <React.Fragment>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="page-container">
          {isSetupPending ? null : !isLoggedIn && !alreadyAtLoginPage ? (
            <Route element={<Navigate to="/login" />} />
          ) : (
            <Outlet />
          )}
        </div>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
};

export default App;
