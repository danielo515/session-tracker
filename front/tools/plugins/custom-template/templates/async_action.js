import {
    ${actionTypes.begin},
    ${actionTypes.success},
    ${actionTypes.failure},
    ${actionTypes.dismissError},
  } from './constants';

import * as api from '../../../common/api'


export function ${_.camelCase(action)}(args = {}) {
  return async (dispatch, getState) => {
    dispatch({
      type: ${actionTypes.begin},
    });

    const { login: { token } } = getState();

      const { error, response } = await api.listSessions({ token });

      if(error){
          dispatch({
              type: ${actionTypes.failure},
              payload: { error },
          });
          return;
      }
      dispatch({
          type: ${actionTypes.success},
          payload: response,
      });

  };
}
  
  // Async action saves request error by default, this method is used to dismiss the error info.
  // If you don't want errors to be saved in Redux store, just ignore this method.
  export function dismiss${_.pascalCase(action)}Error() {
    return {
      type: ${actionTypes.dismissError},
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case ${actionTypes.begin}:
        // Just after a request is sent
        return {
          ...state,
          ${_.camelCase(action)}Pending: true,
          ${_.camelCase(action)}Error: null,
        };
  
      case ${actionTypes.success}:
        // The request is success
        return {
          ...state,
          ${_.camelCase(action)}Pending: false,
          ${_.camelCase(action)}Error: null,
        };
  
      case ${actionTypes.failure}:
        // The request is failed
        return {
          ...state,
          ${_.camelCase(action)}Pending: false,
          ${_.camelCase(action)}Error: action.payload.error,
        };
  
      case ${actionTypes.dismissError}:
        // Dismiss the request failure error
        return {
          ...state,
          ${_.camelCase(action)}Error: null,
        };
  
      default:
        return state;
    }
  }