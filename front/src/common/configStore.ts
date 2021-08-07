import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import history from './history';
import rootReducer from './rootReducer';
import windowTitle from './windowtitleMiddleware';

const router = routerMiddleware(history);

// NOTE: Do not change middleares delaration pattern since rekit plugins may register middlewares to it.
const middlewares = [thunk, router, windowTitle];

/**
 * @param {*} f
 */
let devToolsExtension = (f: any) => f;

/* istanbul ignore if  */
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger');

  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);

  if ((window as any).devToolsExtension) {
    devToolsExtension = (window as any).devToolsExtension();
  }
}

/**
 * @param {import('./rootReducer').RootState} initialState
 */
// @ts-expect-error ts-migrate(4058) FIXME: Return type of exported function has or is using n... Remove this comment to see the full error message
export default function configureStore(initialState: any) {
  const store = createStore(
    rootReducer(history),
    initialState,
    compose(applyMiddleware(...middlewares), devToolsExtension),
  );

  /* istanbul ignore if  */
  if ((module as any).hot) {
    // Enable Webpack hot module replacement for reducers
(module as any).hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer').default(history); // eslint-disable-line
    store.replaceReducer(nextRootReducer);
});
  }
  return store;
}
