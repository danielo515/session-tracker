import { isFulfilled, Middleware } from '@reduxjs/toolkit';
import { HOME_STOP_SESSION_SUCCESS, HOME_SWITCH_TASK_SUCCESS } from 'features/home/redux/constants';
import { startSession } from 'features/home/redux/startSession';

const matchesStartSession = isFulfilled(startSession);

const windowTitle: Middleware = (store) => (next) => (action) => {
  next(action);
  if (matchesStartSession(action)) {
    return action.payload && (window.document.title = action.payload.name);
  }
  switch (action.type) {
    case startSession.fulfilled:
      return action.payload && (window.document.title = action.payload.name);
    case HOME_SWITCH_TASK_SUCCESS:
      return (window.document.title = action.payload.name);
    case HOME_STOP_SESSION_SUCCESS:
      return (window.document.title = process.env.APP_NAME || 'time-tracker');
    default:
      return;
  }
};

export default windowTitle;
