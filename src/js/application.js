import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import Container from './components/layouts/Container';
import DefaultContainer from './components/layouts/DefaultContainer';
import EditorPage from './components/pages/EditorPage';
import IndexPage from './components/pages/IndexPage';
import ImageIndexPage from './components/pages/images/IndexPage';
import UserIndexPage from './components/pages/users/IndexPage';
import AccountIndexPage from './components/pages/account/IndexPage';
import ErrorPage from './components/pages/ErrorPage';

import 'base/reset';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

import { teal700 } from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
  tabs: {
    backgroundColor: teal700
  }
});

ReactDOM.render((
  <MuiThemeProvider muiTheme={ muiTheme }>
    <Provider store={ store }>
      <Router history={ history }>
        <Route path="/" component={ Container }>
          <IndexRoute component={ IndexPage } />
          <Route path="editor" component={ EditorPage } />

          <Route component={ DefaultContainer }>
            <Route path="/images/:id" component={ ImageIndexPage } />
            <Route path="/users/:username" component={ UserIndexPage } />
            <Route path="/account" component={ AccountIndexPage } />
            <Route path="*" component={ ErrorPage } />
          </Route>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
), document.getElementById("react"));
