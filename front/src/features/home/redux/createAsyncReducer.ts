import { createAsyncThunk, createReducer, Draft, PayloadAction } from '@reduxjs/toolkit';

type Arguments<State, Args, Returned> = {
  prefix: string;
  payloadCreator: (args: Args) => Promise<Returned>;
  initialState: State;
  onFulfilled: (
    state: Draft<State>,
    action: PayloadAction<
      Returned,
      string,
      { arg: Args; requestId: string; requestStatus: 'fulfilled' },
      never
    >,
  ) => State;
};

export function createAsyncReducer<State, Args, Returned>({
  prefix,
  payloadCreator,
  initialState,
  onFulfilled,
}: Arguments<State, Args, Returned>) {
  const action = createAsyncThunk(prefix, payloadCreator);

  const reducer = createReducer(initialState, builder => {
    builder.addCase(action.pending, state => {
      return {
        ...state,
        [prefix + 'Pending']: true,
        [prefix + 'Error']: null,
      };
    });
    builder.addCase(action.rejected, (state, { error }) => {
      return {
        ...state,
        [prefix + 'Pending']: false,
        [prefix + 'Error']: error.message || 'Unknown error',
      };
    });
    builder.addCase(action.fulfilled, onFulfilled);
  });

  return {
    action,
    reducer,
  };
}
