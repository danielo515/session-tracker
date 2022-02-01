import { useAppDispatch } from '@common/configStore';
import { LoadingComponent } from '@common/makeAsyncPage';
import { Button, Slide, SlideProps, Snackbar } from '@mui/material';
import useAppSelector from 'hooks/useSelector';
import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../common/Navigation';
import { dismissToast } from './redux/createdToast';
import { editSession } from './redux/editSession';
import EditSession from './EditSession';

function SlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export const HomeWrapper = () => {
  const { pathname } = useLocation();
  const sessionId = useAppSelector((state) => state.createdToast.recentSessionId);
  const dispatch = useAppDispatch();
  const dismiss = () => dispatch(dismissToast());
  const edit = () => dispatch(editSession(sessionId));

  return (
    <React.Fragment>
      <Navigation page={pathname} />
      <Suspense fallback={<LoadingComponent />}>
        <Outlet />
      </Suspense>
      <EditSession />
      <Snackbar
        open={!!sessionId}
        autoHideDuration={6000}
        message="Session registered"
        onClose={dismiss}
        TransitionComponent={SlideLeft}
        action={
          <Button color="inherit" size="small" onClick={edit}>
            Edit
          </Button>
        }
        sx={{ bottom: { xs: 90, sm: 0 } }}
      />
    </React.Fragment>
  );
};
