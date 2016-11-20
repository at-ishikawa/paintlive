import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as LogOutActions from '../../../actions/auth/logIn';

import style from 'page/accounts/index';

class IndexPageComponent extends React.Component {
  render() {
    return (
      <div>
        <section className={ style.menus }>
          <ul className={ style.list }>
            <li className={ style.list__item }>
              <Link to="/accounts/profile">
                <div className={ style.textLink }>Edit Profile</div>
              </Link>
            </li>
            <li className={ style.list__item }>
              <Link to="/account/password">
                <div className={ style.textLink }>Change Password</div>
              </Link>
            </li>
            <li className={ style.list__item }>
              <Link to="/" onClick={ () => { localStorage.removeItem('token'); this.props.logOut(); } }>
                <div className={ style.textLink }>Logout</div>
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
