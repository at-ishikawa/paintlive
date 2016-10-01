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
import ErrorPage from './components/pages/ErrorPage';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <MuiThemeProvider muiTheme={ getMuiTheme() }>
    <Provider store={ store }>
      <Router history={ history }>
        <Route path="/" component={ Container }>
          <IndexRoute component={ IndexPage } />
          <Route path="editor" component={ EditorPage } />

          <Route component={ DefaultContainer }>
            <Route path="*" component={ ErrorPage } />
          </Route>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
), document.getElementById("react"));
