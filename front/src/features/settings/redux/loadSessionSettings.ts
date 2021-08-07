import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SETTINGS_LOAD_SESSION_SETTINGS_BEGIN,
  SETTINGS_LOAD_SESSION_SETTINGS_SUCCESS,
  SETTINGS_LOAD_SESSION_SETTINGS_FAILURE,
  SETTINGS_LOAD_SESSION_SETTINGS_DISMISS_ERROR,
} from './constants';

export function loadSessionSettings(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: SETTINGS_LOAD_SESSION_SETTINGS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: SETTINGS_LOAD_SESSION_SETTINGS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: SETTINGS_LOAD_SESSION_SETTINGS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadSessionSettingsError() {
  return {
    type: SETTINGS_LOAD_SESSION_SETTINGS_DISMISS_ERROR,
  };
}

export function useLoadSessionSettings(params) {
  const dispatch = useDispatch();

  const { home, loadSessionSettingsPending, loadSessionSettingsError } = useSelector(
    state => ({
      home: state.settings.home,
      loadSessionSettingsPending: state.settings.loadSessionSettingsPending,
      loadSessionSettingsError: state.settings.loadSessionSettingsError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(loadSessionSettings(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissLoadSessionSettingsError());
  }, [dispatch]);

  return {
    home,
    loadSessionSettings: boundAction,
    loadSessionSettingsPending,
    loadSessionSettingsError,
    dismissLoadSessionSettingsError: boundDismissError,
  };
}

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
