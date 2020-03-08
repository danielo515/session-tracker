import {
    HOME_UPDATE_SESSION_BEGIN,
    HOME_UPDATE_SESSION_SUCCESS,
    HOME_UPDATE_SESSION_FAILURE,
    HOME_UPDATE_SESSION_DISMISS_ERROR,
  } from './constants';

import * as api from '../../../common/api'


export function updateSession(session = {}) {
  return async (dispatch, getState) => {
    dispatch({
      type: HOME_UPDATE_SESSION_BEGIN,
    });

    const { login: { token } } = getState();

      const { error, response } = await api.updateSession({ token, ...session });

      if(error){
          dispatch({
              type: HOME_UPDATE_SESSION_FAILURE,
              payload: { error },
          });
          return;
      }
      dispatch({
          type: HOME_UPDATE_SESSION_SUCCESS,
          payload: response,
      });

  };
}
  
  // Async action saves request error by default, this method is used to dismiss the error info.
  // If you don't want errors to be saved in Redux store, just ignore this method.
  export function dismissUpdateSessionError() {
    return {
      type: HOME_UPDATE_SESSION_DISMISS_ERROR,
    };
  }
  
  export function reducer(state, action) {
    switch (action.type) {
      case HOME_UPDATE_SESSION_BEGIN:
        // Just after a request is sent
        return {
          ...state,
          updateSessionPending: true,
          updateSessionError: null,
        };
  
      case HOME_UPDATE_SESSION_SUCCESS: {
        const {session} = action.payload
        const updatedIdx = state.sessions.findIndex(({id})=> id === session.id)
        const sessions = state.sessions.slice(0,updatedIdx).concat([session]).concat(state.sessions.slice(updatedIdx+1))
          return {
            ...state,
            sessions,
            editing: false,
            updateSessionPending: false,
            updateSessionError: null,
          };
        }

      case HOME_UPDATE_SESSION_FAILURE:
        // The request is failed
        return {
          ...state,
          editing: false,
          updateSessionPending: false,
          updateSessionError: action.payload.error,
        };
  
      case HOME_UPDATE_SESSION_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          updateSessionError: null,
        };
  
      default:
        return state;
    }
  }
