import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';
import Container from './components/layouts/Container';
import PainterPage from './components/pages/PainterPage';
import ErrorPage from './components/pages/ErrorPage';

import 'bases/reset';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Request from 'network/Request';
import * as LoginActions from 'actions/auth/login';
const login = () => {
  const token = localStorage.getItem('token');
  if (typeof token === 'undefined'){
    return;
  }

  const request = new Request();
  request.get('/authenticate', (user, response, error) => {
    if (error) {
      store.dispatch(LoginActions.failLogIn(response));
      return;
    }

    store.dispatch(LoginActions.succeedLogIn(user));
  });
};

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={ store }>
    <Router onUpdate={ () => window.scrollTo(0, 0) } history={ history }>
      <Route path="/" component={ Container } onEnter={ login }>
        <Route path="painter" component={ PainterPage }/>
        <Route path="*" component={ ErrorPage } status={ 404 } />
      </Route>
    </Router>
  </Provider>
), document.getElementById("react"));
