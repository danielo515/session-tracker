import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import loginReducer from '../features/login/redux/reducer';
import statsReducer from '../features/stats/redux/reducer';
import settingsReducer from '../features/settings/redux/reducer';
import timerReducer from '../features/timer/redux/reducer';
import sessionDefinitionReducer from '../features/session-definition/redux/reducer';
import { ManageIconsReducer } from 'features/Internal/redux';
import { descriptionFormReducer } from 'features/session-definition/redux/definitionForm';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

export const reducerMap = {
  home: homeReducer,
  common: commonReducer,
  login: loginReducer,
  stats: statsReducer,
  settings: settingsReducer,
  timer: timerReducer,
  sessionDefinition: sessionDefinitionReducer,
  manageIcons: ManageIconsReducer,
  descriptionForm: descriptionFormReducer,
} as const;
