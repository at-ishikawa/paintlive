import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Button from 'components/modules/ui/Button';
import * as PageActions from 'actions/pages/users/index';
import * as UserFollowActions from 'actions/users/follow';

import Image from '../../modules/ui/Image';
import ImageListSection from '../../modules/images/ImageListSection';

import style from 'page/users/index';

class IndexPageComponent extends React.Component {

  componentWillMount() {
    this.props.readUser(this.props.params.username);
  }

  render() {
    const user = Object.assign({}, {
      images: []
    }, this.props.user);

    return (
      <div className={ style.contents }>
        <section className={ style.userCard }>
          <div className={ style.userBox }>
            <Image className={ style.userThumbnail }
                   src={ user.thumbnailPath }
            />
            <div className={ style.userBox__summary }>
              <div className={ style.userBox__summary__username }>
                { user.username }
              </div>
              { this.props.loginUser.username != user.username &&
                <div>
                  <Button
                    styleType={ user.following_id ? "positive" : 'action' }
                    onClick={ () => user.following_id ? this.props.unfollowUser(user.username, user.following_id) : this.props.followUser(user.username) }
                  >
                    <i className="material-icons">person</i>
                    { user.following_id ? 'Following' : '+Follow' }
                  </Button>
                </div>
              }
            </div>
          </div>
          <div className={ style.userActionBox + " " + style.linkBox }>
            <Link to={ "/users/" + user.username + "/followings" }>
              <div>Followings</div>
            </Link>
          </div>
        </section>

        <ImageListSection title={ "Other images of " + user.username }
                          images={ user.images }
                          allUrl={ "/user/" + user.username + "/images" }
                          isUserImageList={ true }
                          />

        <ImageListSection title={ "Favorite images of " + user.username }
                          images={ user.images }
                          allUrl={ "/user/" + user.username + "/images" }
                          isUserImageList={ false }
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state.pages.users.index,
    loginUser: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(PageActions, dispatch),
    ...bindActionCreators(UserFollowActions, dispatch)
  };
};

const IndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPageComponent);

export default IndexPage;

