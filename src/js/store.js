import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import reducers from './reducers';
import DevTools from './components/modules/DevTools';
import createLogger from 'redux-logger';

const isDevelopment = process.env.NODE_ENV === 'development';

let middlewares = null;
if (isDevelopment) {
  const logger = createLogger();
  middlewares = compose(
    applyMiddleware(thunk, logger),
    DevTools.instrument()
  );
} else {
  middlewares = applyMiddleware(thunk);
}

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  middlewares
);

export default store;
