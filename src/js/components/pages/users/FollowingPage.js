import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserListItem from 'components/modules/users/UserListItem';
import * as FollowingActions from 'actions/pages/users/following';

import style from 'page/images/index';

class FollowingPageComponent extends React.Component {
  componentWillMount() {
    this.props.readFollowingUsers(this.props.params.username);
  }

  render() {
    const users = this.props.followingUsers;

    return (
      <div className={ style.contents }>
        <section className={ style.imageCard }>
          <ul>
            { users.map(user => <UserListItem user={ user } />) }
          </ul>
        </section>
      </div>
    );
  }
}

const FollowingPage = connect(
  state => {
    return {
      ...state.pages.users.following
    };
  },
  dispatch => {
    return {
      ...bindActionCreators(FollowingActions, dispatch)
    };
  }
)(FollowingPageComponent);

export default FollowingPage;
