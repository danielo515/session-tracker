import { createAsyncThunk, createReducer, Draft, PayloadAction } from '@reduxjs/toolkit';

type LoadingState<State,Prefix extends string> = State &
    { [key in `${Prefix}Error`]: string | null; }
    &
    { [key in `${Prefix}Pending`]: boolean; }

type Arguments<State, Args, Returned, Prefix extends string> = {
    actionName: string;
    prefix: Prefix;
    payloadCreator: (args: Args) => Promise<Returned>;
    initialState: LoadingState<State,Prefix>;
    onFulfilled: (
        state: Draft<LoadingState<State,Prefix>>,
        action: PayloadAction<
            Returned,
            string,
            { arg: Args; requestId: string; requestStatus: 'fulfilled' },
            never
        >,
    ) => LoadingState<State,Prefix>;
};

export function createAsyncReducer<State, Args, Returned, Prefix extends string>({
    prefix,
    payloadCreator,
    initialState,
    onFulfilled,
    actionName,
}: Arguments<State, Args, Returned, Prefix>) {

    const errorKey = `${prefix}Error` as const;
    const pendingKey = `${prefix}Pending` as const;
    const action = createAsyncThunk(actionName, payloadCreator);

    const reducer = createReducer(initialState, builder => {
        builder.addCase(action.pending, state => {
            state[pendingKey] = true;
            state[errorKey] = null;
        });
        builder.addCase(action.rejected, (state, { error }) => {
            return {
                ...state,
                [pendingKey]: false,
                [errorKey]: error.message || 'Unknown error',
            };
        });
        builder.addCase(action.fulfilled, onFulfilled);
    });

    return {
        action,
        reducer,
    };
}
