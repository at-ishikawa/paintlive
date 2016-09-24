import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import reducers from './reducers';
import { socketIoMiddleware, syncWithServer } from './middlewares/socketIoMiddleware';

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(thunk, socketIoMiddleware)
);
syncWithServer(store);

export default store;
