import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import reducers from './reducers';
import { socketIoMiddleware, syncWithServer } from './middlewares/socketIoMiddleware';
import DevTools from './components/modules/DevTools';
import createLogger from 'redux-logger';

const isDevelopment = process.env.NODE_ENV === 'development';

let middlewares = null;
if (isDevelopment) {
  const logger = createLogger();
  middlewares = compose(
    applyMiddleware(thunk, socketIoMiddleware, logger),
    DevTools.instrument()
  );
} else {
  middlewares = applyMiddleware(thunk, socketIoMiddleware);

}

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  middlewares
);
syncWithServer(store);

export default store;
