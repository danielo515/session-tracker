import {
  HOME_START_SESSION_SUCCESS,
  HOME_STOP_SESSION_SUCCESS,
  HOME_SWITCH_TASK_SUCCESS,
} from 'features/home/redux/constants';

/** @type { import("redux").Middleware }*/
const windowTitle = store => next => action => {
  next(action);
  switch (action.type) {
    case HOME_START_SESSION_SUCCESS:
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
