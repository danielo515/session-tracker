import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import history from './history';
import rootReducer, { RootState } from './rootReducer';
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

  //@ts-ignore
  if (window.devToolsExtension) {
    //@ts-ignore
    devToolsExtension = window.devToolsExtension();
  }
}

export default function configureStore(initialState: RootState) {
  const store = createStore(
    rootReducer(history),
    initialState,
    compose(applyMiddleware(...middlewares), devToolsExtension),
  );

  /* istanbul ignore if  */
  //@ts-ignore
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    //@ts-ignore
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default(history); // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
