import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';
import Container from './components/layouts/Container';
import DefaultContainer from './components/layouts/DefaultContainer';
import EditorPage from './components/pages/EditorPage';
import IndexPage from './components/pages/IndexPage';
import ImageIndexPage from './components/pages/images/IndexPage';
import UserIndexPage from './components/pages/users/IndexPage';
import UserFollowingPage from './components/pages/users/FollowingPage';
import SignUpCompletePage from './components/pages/signUp/CompletePage';
import SignUpValidatePage from './components/pages/signUp/ValidatePage';
import SignUpErrorPage from './components/pages/signUp/ErrorPage';
import AccountIndexPage from './components/pages/accounts/IndexPage';
import AccountProfilePage from './components/pages/accounts/ProfilePage';
import AccountPasswordPage from './components/pages/accounts/PasswordPage';
import ErrorPage from './components/pages/ErrorPage';

import 'base/reset';

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

export const requireLogin = (nextState, replace) => {
  const user = store.getState().user;
  if (!user.isLoggedIn) {
    replace({
      pathname: "/"
    });
  }
};

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={ store }>
    <Router onUpdate={ () => window.scrollTo(0, 0) } history={ history }>
      <Route path="/" component={ Container }>
        <Route onEnter={ login }>
          <IndexRoute component={ IndexPage }/>
          <Route path="editor" component={ EditorPage }/>
        </Route>

        <Route component={ DefaultContainer }>
          <Route path="/signup/complete" component={ SignUpCompletePage }/>
          <Route path="/signup/validate" component={ SignUpValidatePage }/>
          <Route path="/signup/error" component={ SignUpErrorPage }/>

          <Route onEnter={ login }>
            <Route path="/images/:id" component={ ImageIndexPage }/>
            <Route path="/users/:username" component={ UserIndexPage }/>
            <Route path="/users/:username/followings" component={ UserFollowingPage }/>

            <Route onEnter={ requireLogin }>
              <Route path="/accounts" component={ AccountIndexPage }/>
              <Route path="/accounts/profile" component={ AccountProfilePage }/>
              <Route path="/accounts/password" component={ AccountPasswordPage }/>
            </Route>

            <Route path="*" component={ ErrorPage }/>
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById("react"));
