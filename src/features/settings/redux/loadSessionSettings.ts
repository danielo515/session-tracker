import { AppDispatch } from '@common/configStore';
import useAppSelector from 'hooks/useSelector';
import { useEffect, useCallback } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';
import {
  SETTINGS_LOAD_SESSION_SETTINGS_BEGIN,
  SETTINGS_LOAD_SESSION_SETTINGS_SUCCESS,
  SETTINGS_LOAD_SESSION_SETTINGS_FAILURE,
  SETTINGS_LOAD_SESSION_SETTINGS_DISMISS_ERROR,
} from './constants';

export function loadSessionSettings() {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: SETTINGS_LOAD_SESSION_SETTINGS_BEGIN,
    });
  };
}

export function dismissLoadSessionSettingsError() {
  return {
    type: SETTINGS_LOAD_SESSION_SETTINGS_DISMISS_ERROR,
  };
}

export function useLoadSessionSettings() {
  const dispatch = useDispatch();

  const { loadSessionSettingsPending, loadSessionSettingsError } = useAppSelector(
    (state) => ({
      loadSessionSettingsPending: state.settings.loadSessionSettingsPending,
      loadSessionSettingsError: state.settings.loadSessionSettingsError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => {
    return dispatch(loadSessionSettings());
  }, [dispatch]);

  useEffect(() => {
    boundAction();
  }, [boundAction]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoadSessionSettingsError());
  }, [dispatch]);

  return {
    loadSessionSettingsPending,
    loadSessionSettingsError,
    dismissLoadSessionSettingsError: boundDismissError,
  };
}

//@ts-expect-error migrate to redux-thunk
export function reducer(state, action) {
  switch (action.type) {
    case SETTINGS_LOAD_SESSION_SETTINGS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadSessionSettingsPending: true,
        loadSessionSettingsError: null,
      };

    case SETTINGS_LOAD_SESSION_SETTINGS_SUCCESS:
      // The request is success
      return {
        ...state,
        loadSessionSettingsPending: false,
        loadSessionSettingsError: null,
      };

    case SETTINGS_LOAD_SESSION_SETTINGS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadSessionSettingsPending: false,
        loadSessionSettingsError: action.data.error,
      };

    case SETTINGS_LOAD_SESSION_SETTINGS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadSessionSettingsError: null,
      };

    default:
      return state;
  }
}
