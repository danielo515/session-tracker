import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import history from './history';
import { reducerMap } from './rootReducer';
import { connectRouter } from 'connected-react-router';
import windowTitle from './windowtitleMiddleware';
import { Simplify } from 'type-fest';

const router = routerMiddleware(history);

// NOTE: Do not change middleares delaration pattern since rekit plugins may register middlewares to it.
const middlewares = [router, windowTitle] as const;

const rootReducer = combineReducers({
  ...reducerMap,
  router: connectRouter(history),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

export type RootState = Simplify<ReturnType<typeof store.getState>>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
