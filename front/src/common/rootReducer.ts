import { combineReducers } from 'redux';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import loginReducer from '../features/login/redux/reducer';
import statsReducer from '../features/stats/redux/reducer';
import { connectRouter } from 'connected-react-router';
import settingsReducer from '../features/settings/redux/reducer';
import timerReducer from '../features/timer/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  home: homeReducer,
  common: commonReducer,
  login: loginReducer,
  stats: statsReducer,
  settings: settingsReducer,
  timer: timerReducer,
};

/** @typedef {ReturnType<ReturnType<typeof rootReducer>>} RootState*/

/**
 * creates a root reducer injecting router reducer
 * @param {typeof import('../common/history').default} history
 */
const rootReducer = (history: any) => combineReducers({
  ...reducerMap,
  router: connectRouter(history),
});
export default rootReducer;
