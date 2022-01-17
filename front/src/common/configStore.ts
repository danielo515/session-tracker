import { configureStore, combineReducers, ThunkDispatch, Action } from '@reduxjs/toolkit';
import { createRouterReducer, createRouterMiddleware } from '@lagunovsky/redux-react-router';
import { useDispatch } from 'react-redux';
import history from './history';
import { reducerMap } from './rootReducer';
import windowTitle from './windowtitleMiddleware';
import { Simplify } from 'type-fest';

const router = createRouterMiddleware(history);

// NOTE: Do not change middleares delaration pattern since rekit plugins may register middlewares to it.
const middlewares = [router, windowTitle] as const;

const rootReducer = combineReducers({
  ...reducerMap,
  router: createRouterReducer(history),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

export type RootState = Simplify<ReturnType<typeof store.getState>>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

export default store;
