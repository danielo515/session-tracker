import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import history from './history';
import { reducerMap } from './rootReducer';
import { connectRouter } from 'connected-react-router';
import windowTitle from './windowtitleMiddleware';

const router = routerMiddleware(history);

// NOTE: Do not change middleares delaration pattern since rekit plugins may register middlewares to it.
const middlewares = [router, windowTitle] as const;

const store = configureStore({
  reducer: {
    ...reducerMap,
    router: connectRouter(history),
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
