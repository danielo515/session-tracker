import { createSessionDefinition } from '@common/api';
import useAppSelector from 'hooks/useSelector';
import { useCallback } from 'react';
import { useDispatch, shallowEqual } from 'react-redux';
import {
  SESSION_DEFINITION_CREATE_BEGIN,
  SESSION_DEFINITION_CREATE_SUCCESS,
  SESSION_DEFINITION_CREATE_FAILURE,
  SESSION_DEFINITION_CREATE_DISMISS_ERROR,
} from './constants';

export function create(args) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: SESSION_DEFINITION_CREATE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = createSessionDefinition(args);
      doRequest
        .then(res => {
          dispatch({
            type: SESSION_DEFINITION_CREATE_SUCCESS,
            data: res.response,
          });
          resolve(res);
        })
        .catch(err => {
          dispatch({
            type: SESSION_DEFINITION_CREATE_FAILURE,
            data: { error: err },
          });
          reject(err);
        });
    });

    return promise;
  };
}

export function dismissCreateError() {
  return {
    type: SESSION_DEFINITION_CREATE_DISMISS_ERROR,
  };
}

export function useCreate() {
  const dispatch = useDispatch();

  const { sessionDefinitions, createPending, createError } = useAppSelector(
    state => ({
      sessionDefinitions: state.sessionDefinition.byName,
      createPending: state.sessionDefinition.createPending,
      createError: state.sessionDefinition.createError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (...args) => {
      return dispatch(create(...args));
    },
    [dispatch],
  );

  const boundDismissError = useCallback(() => {
    return dispatch(dismissCreateError());
  }, [dispatch]);

  return {
    sessionDefinitions,
    create: boundAction,
    createPending,
    createError,
    dismissCreateError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SESSION_DEFINITION_CREATE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createPending: true,
        createError: null,
      };

    case SESSION_DEFINITION_CREATE_SUCCESS:
      // The request is success
      return {
        ...state,
        createPending: false,
        createError: null,
        byName: {
          ...state.byName,
          [action.data.name]: action.data,
        },
        all: [...state.all, action.data],
      };

    case SESSION_DEFINITION_CREATE_FAILURE:
      // The request is failed
      return {
        ...state,
        createPending: false,
        createError: action.data.error,
      };

    case SESSION_DEFINITION_CREATE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createError: null,
      };

    default:
      return state;
  }
}
