import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as LogOutActions from '../../../actions/auth/logIn';

class IndexPageComponent extends React.Component {
  render() {
    return (
      <div>
        <section>
          <ul>
            <li>
              <Link to="/" onClick={ () => { localStorage.removeItem('token'); this.props.logOut(); } }>
                Logout
              </Link>
            </li>
          </ul>
        </section>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(LogOutActions, dispatch)
  }
};

const IndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPageComponent);

export default IndexPage;
