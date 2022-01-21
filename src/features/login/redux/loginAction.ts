import { replace } from '@lagunovsky/redux-react-router';
import * as api from '../../../common/api';
import { getErrorData } from '../../../common/getErrorData';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

type Props = {
  email: string;
  password: string;
  rememberMe: boolean;
  isGoogleLogin: boolean;
};

export const loginAction = createAsyncThunk(
  'LOGIN',
  async ({ email, password, isGoogleLogin = false }: Props, { rejectWithValue, dispatch }) => {
    let result;

    if (isGoogleLogin) {
      result = await api.googleLogin();
    } else {
      result = await api.login({ email, password });
    }

    if (result.error) {
      console.error('Error logging in:', result.error);
      return rejectWithValue(result.error);
    }

    dispatch(replace('/'));
    return result.response?.token;
  },
);

export const {
  reducer,
  actions: { dismissLoginActionError },
} = createSlice({
  name: 'login',
  initialState,
  reducers: {
    dismissLoginActionError(state) {
      state.loginActionError = null;
      state.loginActionPending = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginAction.pending, (state) => {
      return {
        ...state,
        loginActionPending: true,
        loginActionError: null,
      };
    });

    builder.addCase(loginAction.fulfilled, (state, { payload }) => {
      return {
        ...state,
        token: payload?.token,
        loginActionPending: false,
        loginActionError: null,
      };
    });

    builder.addCase(loginAction.rejected, (state, { error }) => {
      return {
        ...state,
        loginActionPending: false,
        loginActionError: getErrorData(error).title,
      };
    });
  },
});
