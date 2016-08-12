import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import Container from './components/layouts/Container';
import IndexPage from './containers/IndexPage';
import ErrorPage from './components/pages/ErrorPage';
import reducers from './reducers';

const store = createStore(
  combineReducers({
    reducers,
    routing: routerReducer
  })
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ Container }>
        <IndexRoute component={ IndexPage } />
        <Route path="*" component={ ErrorPage } />
      </Route>
    </Router>
  </Provider>
), document.getElementById("react"));
