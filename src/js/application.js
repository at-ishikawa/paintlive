import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Container from './components/layouts/Container';
import IndexPage from './components/pages/IndexPage';
import ErrorPage from './components/pages/ErrorPage';
import reducers from './reducers';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = createStore(
  combineReducers({
    reducers,
    routing: routerReducer
  })
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <MuiThemeProvider muiTheme={ getMuiTheme() }>
    <Provider store={ store }>
      <Router history={ history }>
        <Route path="/" component={ Container }>
          <IndexRoute component={ IndexPage } />
          <Route path="*" component={ ErrorPage } />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
), document.getElementById("react"));
