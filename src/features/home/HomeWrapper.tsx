import { useAppDispatch } from '@common/configStore';
import { LoadingComponent } from '@common/makeAsyncPage';
import { Button, Snackbar } from '@mui/material';
import useAppSelector from 'hooks/useSelector';
import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../common/Navigation';
import { dismissToast } from './redux/createdToast';

export const HomeWrapper = () => {
  const { pathname } = useLocation();
  const sessionId = useAppSelector((state) => state.createdToast.recentSessionId);
  const dispatch = useAppDispatch();
  const dismiss = () => dispatch(dismissToast());

  return (
    <React.Fragment>
      <Navigation page={pathname} />
      <Suspense fallback={<LoadingComponent />}>
        <Outlet />
      </Suspense>
      <Snackbar
        open={!!sessionId}
        autoHideDuration={6000}
        message="Session registered"
        onClose={dismiss}
        action={
          <Button color="inherit" size="small" onClick={dismiss}>
            Edit
          </Button>
        }
        sx={{ bottom: { xs: 90, sm: 0 } }}
      />
    </React.Fragment>
  );
};
